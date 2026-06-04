import React, { useState, useEffect, useRef } from 'react';
import { apiService } from '../../services/api.service';
import AgentHeader from '../../layout/agent/AgentHeader';

// --- Type Definitions & Contracts ---
export type PropertyStatus = 'Ongoing' | 'Completed';
export type ModalMode = 'add' | 'edit';
export type ToastType = 'Success' | 'Edit' | 'Deleted';

export interface PropertyItem {
  id: string;
  name: string;
  type: string;
  location: string;
  price: string;
  rawPrice?: string;
  status: PropertyStatus;
  desc?: string;
  bhk?: string;
  sqft?: string;
  aptType?: string;
  propertyType?: string;
}

export interface ToastConfig {
  message: string;
  type: ToastType;
  visible: boolean;
}

export interface FormFields {
  id: string;
  name: string;
  price: string;
  desc: string;
  location: string;
  bhk: string;
  sqft: string;
  aptType: string;
  type: string;
  status: PropertyStatus | '';
  fileName: string;
}

interface AgentApiProperty {
  _id: string;
  title?: string;
  description?: string;
  price?: number;
  address?: string;
  bhk?: string;
  sqft?: string | number;
  apartmentType?: string;
  propertyType?: string;
  projectStatus?: PropertyStatus;
}

interface AgentDashboardSummary {
  propertiesList?: AgentApiProperty[];
}

const formatPrice = (price?: number) => {
  if (typeof price !== 'number' || Number.isNaN(price)) return '\u20b90';
  return '\u20b9' + price.toLocaleString('en-IN');
};

const toTitleCase = (value?: string) => {
  if (!value) return 'N/A';
  return value
    .split(/[\s_-]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
};

const toApiPropertyType = (value: string) => {
  const normalized = value.trim().toLowerCase();
  if (normalized === 'rent house') return 'rental';
  return normalized || '--';
};

const mapApiProperty = (property: AgentApiProperty): PropertyItem => ({
  id: property._id,
  name: property.title || 'Untitled Property',
  type: toTitleCase(property.propertyType),
  location: property.address || 'N/A',
  price: formatPrice(property.price),
  rawPrice: typeof property.price === 'number' ? String(property.price) : '',
  status: property.projectStatus || 'Ongoing',
  desc: property.description || '',
  bhk: property.bhk || '',
  sqft: property.sqft ? String(property.sqft) : '',
  aptType: property.apartmentType || '',
  propertyType: property.propertyType || '',
});

const buildPropertyFormData = (formState: FormFields, selectedFile: File | null) => {
  const formData = new FormData();

  formData.append('title', formState.name);
  formData.append('description', formState.desc);
  formData.append('price', formState.price);
  formData.append('address', formState.location);
  formData.append('bhk', formState.bhk || '--');
  formData.append('sqft', formState.sqft || '--');
  formData.append('apartmentType', formState.aptType || '--');
  formData.append('propertyType', toApiPropertyType(formState.type));
  formData.append('projectStatus', formState.status || 'Ongoing');

  if (selectedFile) {
    formData.append('image', selectedFile);
  }

  return formData;
};

const ManagePropertiesDashboard: React.FC = () => {
  // --- Core State Reactive Containers ---
  const [propertiesData, setPropertiesData] = useState<PropertyItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<ModalMode>('add');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const [formState, setFormState] = useState<FormFields>({
    id: '',
    name: '',
    price: '',
    desc: '',
    location: '',
    bhk: '',
    sqft: '',
    aptType: '',
    type: '',
    status: '',
    fileName: 'Click to upload or drag and drop',
  });

  const [toast, setToast] = useState<ToastConfig>({
    message: 'Action Successful',
    type: 'Success',
    visible: false,
  });

  const itemsPerPage = 10;
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadAgentProperties = async () => {
    const response = await apiService.agent.getDashboardSummary();
    const payload = response.data as AgentDashboardSummary;
    setPropertiesData((payload.propertiesList || []).map(mapApiProperty));
  };

  // --- Database-backed initializer ---
  useEffect(() => {
    loadAgentProperties().catch(() => {
      setPropertiesData([]);
      showToast('Unable to fetch properties from database', 'Deleted');
    });
  }, []);

  // --- Calculations for Slice Offsets & Pagination ---
  const totalPages = Math.max(1, Math.ceil(propertiesData.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = propertiesData.slice(startIndex, endIndex);

  // --- Action Dispatchers & Workflow Controllers ---
  const showToast = (message: string, type: ToastType) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ message, type, visible: true });

    toastTimeoutRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDeleteProperty = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      const targets = propertiesData.find((p) => p.id === id);
      if (targets) {
        const propName = targets.name;
        try {
          await apiService.properties.remove(id);
          const updatedList = propertiesData.filter((p) => p.id !== id);
          const nextTotalPages = Math.ceil(updatedList.length / itemsPerPage);

          if (currentPage > nextTotalPages && nextTotalPages > 0) {
            setCurrentPage(nextTotalPages);
          }

          setPropertiesData(updatedList);
          showToast(`Deleted "${propName}" successfully!`, 'Deleted');
          loadAgentProperties().catch(() => undefined);
        } catch (_error) {
          showToast(`Failed to delete "${propName}"`, 'Deleted');
        }
      }
    }
  };

  // --- Modal Operations Logic ---
  const handleOpenModal = (mode: ModalMode, id: string | null = null) => {
    setModalMode(mode);
    setSelectedFile(null);
    if (mode === 'add') {
      setFormState({
        id: '',
        name: '',
        price: '',
        desc: '',
        location: '',
        bhk: '',
        sqft: '',
        aptType: '',
        type: '',
        status: '',
        fileName: 'Click to upload or drag and drop',
      });
    } else if (mode === 'edit' && id) {
      const match = propertiesData.find((p) => p.id === id);
      if (match) {
        setFormState({
          id: match.id,
          name: match.name,
          price: match.rawPrice || match.price.replace(/[^0-9]/g, ''),
          desc: match.desc || '',
          location: match.location,
          bhk: match.bhk || '',
          sqft: match.sqft || '',
          aptType: match.aptType || '',
          type: match.type,
          status: match.status,
          fileName: 'Click to upload or drag and drop',
        });
      }
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const fieldMap: { [key: string]: keyof FormFields } = {
      'form-name': 'name',
      'form-price': 'price',
      'form-desc': 'desc',
      'form-location': 'location',
      'form-bhk': 'bhk',
      'form-sqft': 'sqft',
      'form-apt-type': 'aptType',
      'form-type': 'type',
      'form-status': 'status',
    };

    const targetKey = fieldMap[id];
    if (targetKey) {
      setFormState((prev) => ({ ...prev, [targetKey]: value }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFormState((prev) => ({ ...prev, fileName: `Selected: ${file.name}` }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const propertyName = formState.name || 'Property';
    const formData = buildPropertyFormData(formState, selectedFile);

    try {
      if (modalMode === 'add') {
        await apiService.properties.create(formData);
        setCurrentPage(1);
        showToast('New Property added successfully!', 'Success');
      } else {
        await apiService.properties.update(formState.id, formData);
        showToast('Property updated successfully!', 'Edit');
      }

      await loadAgentProperties();
      handleCloseModal();
    } catch (_error) {
      showToast(
        modalMode === 'add'
          ? `Failed to add "${propertyName}"`
          : `Failed to update "${propertyName}"`,
        modalMode === 'add' ? 'Deleted' : 'Edit'
      );
    }
  };

  return (
    <>
      {/* Central Viewport Content Stream Wrapper */}
      <main className="flex-1 h-full overflow-y-auto bg-[#f4f7f6] relative w-full">
        <div className="mx-auto max-w-[1320px] flex flex-col p-4 md:p-6 lg:p-8 min-h-full">
          
          {/* Header Controls Interface section */}
          <AgentHeader title="Manage Properties" />

          {/* Table Data Board module layout */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 flex flex-col relative z-10 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
              <h3 className="font-bold text-gray-800 text-lg">Property List</h3>
              <button
                onClick={() => handleOpenModal('add')}
                className="bg-[#161a2b] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors shadow-md flex items-center gap-2 shrink-0"
              >
                <i className="fas fa-plus"></i> Add Property
              </button>
            </div>

            <div className="overflow-x-auto w-full relative border rounded-xl">
              <table className="w-full text-sm text-left whitespace-nowrap min-w-[900px]">
                <thead className="text-white bg-[#161a2b]">
                  <tr>
                    <th className="px-5 py-4 font-medium rounded-tl-xl">Property Name</th>
                    <th className="px-5 py-4 font-medium">Type</th>
                    <th className="px-5 py-4 font-medium">Location</th>
                    <th className="px-5 py-4 font-medium">Price</th>
                    <th className="px-5 py-4 font-medium">Status</th>
                    <th className="px-5 py-4 font-medium text-center rounded-tr-xl">Actions</th>
                  </tr>
                </thead>
                <tbody id="property-table-body" className="text-gray-600">
                  {currentItems.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50/80 transition border-b border-gray-50 last:border-0"
                    >
                      <td className="px-5 py-4 font-bold text-[#161a2b]">{item.name}</td>
                      <td className="px-5 py-4 text-gray-600 font-medium">{item.type}</td>
                      <td className="px-5 py-4 text-gray-600 font-medium">
                        <i className="fas fa-map-marker-alt text-gray-400 mr-2"></i>
                        {item.location}
                      </td>
                      <td className="px-5 py-4 font-bold text-gray-800">{item.price}</td>
                      <td className="px-5 py-4">
                        {item.status === 'Ongoing' ? (
                          <span className="px-3 py-1 rounded-md bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
                            Ongoing
                          </span>
                        ) : item.status === 'Completed' ? (
                          <span className="px-3 py-1 rounded-md bg-green-50 border border-green-200 text-green-700 text-xs font-bold">
                            Completed
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-md bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold">
                            {item.status}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-center">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => handleOpenModal('edit', item.id)}
                            className="w-8 h-8 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 transition flex items-center justify-center"
                            title="Edit Property"
                          >
                            <i className="fas fa-edit text-sm"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteProperty(item.id)}
                            className="w-8 h-8 rounded bg-red-50 text-red-600 hover:bg-red-100 transition flex items-center justify-center"
                            title="Delete Property"
                          >
                            <i className="fas fa-trash text-sm"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls Footer section */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600 border-t border-gray-100 pt-5">
              <span className="font-semibold text-gray-800 text-center w-full sm:w-auto">
                Page <span id="current-page-display" className="text-[#161a2b]">{currentPage}</span> of{' '}
                <span id="total-pages-display">{totalPages}</span>
              </span>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-end">
                <button
                  id="btn-prev"
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="px-4 py-2 font-semibold bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-[#161a2b] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="fas fa-chevron-left mr-1 text-xs"></i> Prev
                </button>
                <button
                  id="btn-next"
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="px-4 py-2 font-semibold bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-[#161a2b] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next <i className="fas fa-chevron-right ml-1 text-xs"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Dynamic Context Modal Layer System */}
      <div id="property-modal" className={`fixed inset-0 z-[60] flex items-center justify-center ${isModalOpen ? '' : 'hidden'}`}>
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={handleCloseModal}
        ></div>

        <div className="flex items-center justify-center w-full max-w-2xl p-4 text-center sm:p-0 z-10">
          <div
            id="modal-panel"
            className={`relative bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all w-full flex flex-col duration-300 ${
              isModalOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}
          >
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#161a2b]/10 flex items-center justify-center text-[#161a2b]">
                  <i
                    id="modal-icon"
                    className={`text-lg ${modalMode === 'add' ? 'fas fa-building' : 'fas fa-edit'}`}
                  ></i>
                </div>
                <h3 id="modal-title" className="text-xl font-bold text-gray-900">
                  {modalMode === 'add' ? 'Add New Property' : 'Edit Property'}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-red-500 transition-colors focus:outline-none p-1"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <form id="property-form" onSubmit={handleFormSubmit} className="flex flex-col min-h-0 flex-1">
              <input type="hidden" id="form-id" value={formState.id} />

              {/* Added Scroll Boundary Class Architecture below (max-h and overflow-y) */}
              <div className="modal-body p-4 sm:p-6 space-y-5 max-h-[65vh] md:max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="form-name"
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder="2BHK Apartment"
                      required
                      className="w-full bg-white border border-gray-300 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-[#161a2b] outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Price (₹) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="form-price"
                      value={formState.price}
                      onChange={handleInputChange}
                      placeholder="7800000"
                      required
                      className="w-full bg-white border border-gray-300 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-[#161a2b] outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
                  <textarea
                    id="form-desc"
                    value={formState.desc}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Near metro station, ready to move."
                    className="w-full bg-white border border-gray-300 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-[#161a2b] outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Address</label>
                    <input
                      type="text"
                      id="form-location"
                      value={formState.location}
                      onChange={handleInputChange}
                      placeholder="Kolkata, India"
                      className="w-full bg-white border border-gray-300 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-[#161a2b] outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">BHK Type</label>
                    <select
                      id="form-bhk"
                      value={formState.bhk}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-gray-300 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-[#161a2b] outline-none transition-all cursor-pointer"
                    >
                      <option value="" disabled>Select BHK</option>
                      <option value="1BHK">1BHK</option>
                      <option value="2BHK">2BHK</option>
                      <option value="3BHK">3BHK</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Sq.FT</label>
                    <input
                      type="number"
                      id="form-sqft"
                      value={formState.sqft}
                      onChange={handleInputChange}
                      placeholder="1200"
                      className="w-full bg-white border border-gray-300 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-[#161a2b] outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Apartment Type</label>
                    <select
                      id="form-apt-type"
                      value={formState.aptType}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-gray-300 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-[#161a2b] outline-none transition-all cursor-pointer"
                    >
                      <option value="" disabled>Select Type</option>
                      <option value="Rent House">Rent House</option>
                      <option value="Apartment">Apartment</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Property Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="form-type"
                      value={formState.type}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white border border-gray-300 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-[#161a2b] outline-none transition-all cursor-pointer"
                    >
                      <option value="" disabled>Select Property</option>
                      <option value="Home">Home</option>
                      <option value="Office">Office</option>
                      <option value="Villa">Villa</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Rental">Rental</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Project Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="form-status"
                      value={formState.status}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white border border-gray-300 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-[#161a2b] outline-none transition-all cursor-pointer"
                    >
                      <option value="" disabled>Select Status</option>
                      <option value="Completed">Completed</option>
                      <option value="Ongoing">Ongoing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Image (optional)</label>
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#161a2b] hover:bg-gray-50 transition-all"
                  >
                    <i className="fas fa-cloud-upload-alt text-2xl text-gray-400 mb-2"></i>
                    <span id="file-text" className="text-sm text-gray-500 font-medium text-center px-2">
                      {formState.fileName}
                    </span>
                    <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
              </div>

              <div className="bg-gray-50 px-4 sm:px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 shrink-0">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="w-full sm:w-auto px-5 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-100 transition-colors shadow-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="submit-btn"
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#161a2b] rounded-xl text-sm font-bold text-white hover:bg-[#252c47] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <i
                    id="btn-icon"
                    className={`fas ${modalMode === 'add' ? 'fa-save' : 'fa-sync-alt'}`}
                  ></i>
                  <span id="btn-text">
                    {modalMode === 'add' ? 'Save Property' : 'Update Property'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Global Operation Notification Center Overlay Toast */}
      <div
        id="toast"
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 lg:left-auto lg:right-8 lg:translate-x-0 z-[70] flex items-center p-4 space-x-3 w-max max-w-xs bg-white rounded-xl shadow-2xl border-l-4 transition-all duration-300 ease-in-out ${
          toast.visible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2 pointer-events-none'
        } ${
          toast.type === 'Success' || toast.type === 'Edit' ? 'border-[#161a2b]' : 'border-red-500'
        }`}
        role="alert"
      >
        <div
          id="toast-icon"
          className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg text-white shadow-sm ${
            toast.type === 'Success' || toast.type === 'Edit' ? 'bg-[#161a2b]' : 'bg-red-500'
          }`}
        >
          {toast.type === 'Edit' ? (
            <i className="fas fa-sync-alt"></i>
          ) : toast.type === 'Deleted' ? (
            <i className="fas fa-trash"></i>
          ) : (
            <i className="fas fa-check"></i>
          )}
        </div>
        <div id="toast-message" className="ml-3 text-sm font-semibold text-gray-800">
          {toast.message}
        </div>
      </div>
    </>
  );
};

export default ManagePropertiesDashboard;

import React, { useState, useEffect, useRef } from 'react';
import { apiService } from '../../services/api.service';
import { getErrorMessage } from '../../services/helper/global.helper';

// --- Type Definitions ---
export type InquiryStatus = 'Pending' | 'Approved' | 'Disapproved' | 'Deleted';

export interface CustomerInquiry {
  id: string;
  img: string;
  clientName: string;
  clientEmail: string;
  customerMessage: string;
  propertyName: string;
  status: InquiryStatus;
}

export interface ToastConfig {
  message: string;
  type: InquiryStatus;
  visible: boolean;
}

interface AgentLeadProperty {
  title?: string;
}

interface AgentLead {
  _id: string;
  name?: string;
  email?: string;
  messageText?: string;
  requestAction?: 'pending' | 'approved' | 'disapproved';
  propertyId?: AgentLeadProperty | null;
}

interface AgentLeadResponse {
  pagination?: {
    totalLeads?: number;
    totalPages?: number;
    currentPage?: number;
  };
  leads?: AgentLead[];
}

const mapRequestActionToStatus = (action?: AgentLead['requestAction']): InquiryStatus => {
  if (action === 'approved') return 'Approved';
  if (action === 'disapproved') return 'Disapproved';
  return 'Pending';
};

const mapLeadToInquiry = (lead: AgentLead, index: number): CustomerInquiry => ({
  id: lead._id,
  img: `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${30 + (index % 20)}.jpg`,
  clientName: lead.name || 'Unknown Client',
  clientEmail: lead.email || 'N/A',
  customerMessage: lead.messageText || '',
  propertyName: lead.propertyId?.title || 'Property Deleted',
  status: mapRequestActionToStatus(lead.requestAction),
});

const AgentCustomerIquiry: React.FC = () => {
  // --- State Hooks ---
  const [customersData, setCustomersData] = useState<CustomerInquiry[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalResultCount, setTotalResultCount] = useState<number>(0);
  const [apiTotalPages, setApiTotalPages] = useState<number>(1);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const [toast, setToast] = useState<ToastConfig>({
    message: 'Action Successful',
    type: 'Pending',
    visible: false,
  });

  const itemsPerPage = 16;
const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadCustomerInquiries = async (page = currentPage) => {
    try {
      const response = await apiService.agent.getInquiryLeads(page);
      const payload = response.data as AgentLeadResponse;
      const leads = payload.leads || [];

      setCustomersData(leads.map((lead, index) => mapLeadToInquiry(lead, index)));
      setTotalResultCount(payload.pagination?.totalLeads ?? leads.length);
      setApiTotalPages(Math.max(1, payload.pagination?.totalPages ?? 1));
      setCurrentPage(payload.pagination?.currentPage ?? page);
    } catch (error) {
      const message = getErrorMessage(error);

      setCustomersData([]);
      setTotalResultCount(0);
      setApiTotalPages(1);
      if (message !== 'No inquiry records found on this page slice.') {
        showToast(message, 'Deleted');
      }
    }
  };

  // --- Database-backed Data Initialization ---
  useEffect(() => {
    loadCustomerInquiries(1);
  }, []);

  // --- Click Outside Listener to Close Dropdowns ---
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.custom-dropdown') && openDropdownIndex !== null) {
        setOpenDropdownIndex(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [openDropdownIndex]);

  // --- Filter Out Deleted Entries for UI Presentation ---
  const activeCustomers = customersData.filter((c) => c.status !== 'Deleted');
  
  // --- Pagination Slice Calculators ---
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + activeCustomers.length;
  const currentItems = activeCustomers;
  const totalPages = apiTotalPages;

  // --- Helper to Retrieve Dynamic Button Styling Classnames ---
  const getStatusBtnClass = (status: InquiryStatus): string => {
    if (status === 'Approved')
      return 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100 shadow-[0_0_10px_rgba(34,197,94,0.1)]';
    if (status === 'Disapproved')
      return 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100 shadow-[0_0_10px_rgba(249,115,22,0.1)]';
    return 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50';
  };

  // --- Toast Trigger Dispatcher ---
  const showToast = (message: string, type: InquiryStatus) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ message, type, visible: true });

    toastTimeoutRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  // --- Action Click Handlers ---
  const toggleDropdown = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const selectAction = async (e: React.MouseEvent, targetId: string, action: InquiryStatus) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDropdownIndex(null);

    const targetCustomer = customersData.find((cust) => cust.id === targetId);
    const clientName = targetCustomer?.clientName || 'customer';

    try {
      if (action === 'Approved') {
        await apiService.agent.updateInquiryAction(targetId, 'approved');
      } else if (action === 'Disapproved') {
        await apiService.agent.updateInquiryAction(targetId, 'disapproved');
      } else if (action === 'Deleted') {
        await apiService.agent.deleteInquiry(targetId);
      } else {
        showToast(`${clientName} is already pending`, 'Pending');
        return;
      }

      showToast(`Status updated to ${action} for ${clientName}`, action);
      await loadCustomerInquiries(currentPage);
    } catch (error) {
      showToast(getErrorMessage(error), action);
    }
  };

  const changePage = async (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setOpenDropdownIndex(null);
      await loadCustomerInquiries(page);
    }
  };

  // Pagination Display Adjustments
  const displayStart = totalResultCount === 0 ? 0 : startIndex + 1;
  const displayEnd = Math.min(startIndex + activeCustomers.length, totalResultCount);

  return (
    <>
      {/* Dynamic Content Main Entry Viewport wrapper */}
      <main className="flex-1 h-full overflow-y-auto bg-[#f4f7f6] relative w-full">
        <div className="mx-auto max-w-[1320px] flex flex-col p-4 md:p-6 lg:p-8 min-h-full">
          
          {/* Main Top Breadcrumb Header Content */}
          <header className="sticky top-0 z-30 bg-[#f4f7f6] py-2 mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-[#161a2b] truncate">
                Customer Inquiry
              </h1>
            </div>

            <div className="flex items-center gap-2 md:gap-4 bg-white/50 backdrop-blur-sm p-1.5 rounded-full shadow-sm shrink-0">
              <button className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition">
                <i className="fas fa-search"></i>
              </button>

              <button className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition relative">
                <i className="fas fa-bell"></i>
              </button>
              <img
                src="https://randomuser.me/api/portraits/women/30.jpg" /* Replaced original broken asset ref path for local presentation safely */
                alt="User Profile"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover border border-gray-200 cursor-pointer ml-1"
              />
            </div>
          </header>

          <h2 className="text-xl font-bold text-[#161a2b] mb-4 shrink-0">
            List view
          </h2>

          {/* Grid Layout Core Wrapper */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 flex flex-col relative z-10 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800 text-lg">Customer List</h3>
            </div>

            <div className="overflow-x-auto w-full relative">
              {/* Table System */}
              <table className="w-full text-sm text-left whitespace-nowrap min-w-[950px]">
                <thead className="text-white bg-[#161a2b]">
                  <tr>
                    <th className="px-5 py-3.5 font-medium">ID</th>
                    <th className="px-5 py-3.5 font-medium">Client Name</th>
                    <th className="px-5 py-3.5 font-medium">Client Email</th>
                    <th className="px-5 py-3.5 font-medium">Customer Message</th>
                    <th className="px-5 py-3.5 font-medium">Property Name</th>
                    <th className="px-5 py-3.5 font-medium text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 relative z-0">
                  {currentItems.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-5 py-8 text-center text-gray-500">
                        No customer inquiries found.
                      </td>
                    </tr>
                  )}
                  {currentItems.map((item, index) => {
                    // Positional layouts mapping matching original JS runtime calculations
                    const actualIndex = startIndex + index;
                    const isTopHalf = index < 10;

                    const tooltipPosClass = isTopHalf ? 'top-full mt-2' : 'bottom-full mb-2';
                    const arrowPosClass = isTopHalf
                      ? 'bottom-full border-b-gray-800 border-x-transparent border-t-transparent'
                      : 'top-full border-t-gray-800 border-x-transparent border-b-transparent';

                    const dropdownPosClass = isTopHalf
                      ? 'top-full mt-1.5 origin-top-right'
                      : 'bottom-full mb-1.5 origin-bottom-right';

                    const isDropdownOpen = openDropdownIndex === actualIndex;

                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50/50 transition border-b border-gray-50 last:border-0 relative"
                      >
                        <td className="px-5 py-4 font-medium text-gray-700">{item.id}</td>
                        <td className="px-5 py-4 flex items-center gap-3">
                          <img
                            src={item.img}
                            alt={item.clientName}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="font-medium text-gray-800">{item.clientName}</span>
                        </td>
                        <td className="px-5 py-4 text-gray-600">{item.clientEmail}</td>

                        {/* Customer Message Row with CSS Hover Tooltip Layout elements preserved */}
                        <td className="px-5 py-4 relative group cursor-help">
                          <div className="truncate max-w-[180px] text-gray-500">
                            {item.customerMessage}
                          </div>
                          <div
                            className={`absolute ${tooltipPosClass} left-1/2 -translate-x-1/2 hidden group-hover:block w-64 bg-gray-800 text-white text-xs rounded-lg p-3 shadow-xl z-50 whitespace-normal leading-relaxed pointer-events-none`}
                          >
                            {item.customerMessage}
                            <div className={`absolute left-1/2 -translate-x-1/2 border-[6px] ${arrowPosClass}`}></div>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-gray-800 font-medium">{item.propertyName}</td>

                        {/* Dropdown Action Controls Column */}
                        <td className="px-5 py-3 w-40 text-center">
                          <div className="relative inline-block text-left w-full custom-dropdown">
                            <button
                              type="button"
                              onClick={(e) => toggleDropdown(e, actualIndex)}
                              className={`inline-flex justify-between items-center w-full rounded-lg border px-3 py-2 text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-[#161a2b]/20 ${getStatusBtnClass(
                                item.status
                              )}`}
                            >
                              <span>{item.status}</span>
                              <i
                                className={`fas fa-chevron-down text-[10px] ml-2 transition-transform duration-300 ${
                                  isDropdownOpen ? 'rotate-180' : ''
                                }`}
                              ></i>
                            </button>

                            {/* Dynamic Conditional Dropdown List Panel wrapper mapping */}
                            <div
                              className={`absolute right-0 z-50 ${dropdownPosClass} w-[140px] rounded-xl bg-white shadow-xl ring-1 ring-black/5 focus:outline-none overflow-hidden transition-all duration-200 ${
                                isDropdownOpen
                                  ? 'opacity-100 scale-100 pointer-events-auto'
                                  : 'opacity-0 scale-95 pointer-events-none'
                              }`}
                            >
                              <div className="py-1 flex flex-col p-1 gap-0.5">
                                <a
                                  href="#"
                                  onClick={(e) => selectAction(e, item.id, 'Pending')}
                                  className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition"
                                >
                                  <i className="fas fa-circle text-[8px] text-gray-400"></i> Pending
                                </a>
                                <a
                                  href="#"
                                  onClick={(e) => selectAction(e, item.id, 'Approved')}
                                  className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-green-700 rounded-lg hover:bg-green-50 transition"
                                >
                                  <i className="fas fa-check-circle text-[10px] text-green-500"></i> Approve
                                </a>
                                <a
                                  href="#"
                                  onClick={(e) => selectAction(e, item.id, 'Disapproved')}
                                  className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-orange-700 rounded-lg hover:bg-orange-50 transition"
                                >
                                  <i className="fas fa-times-circle text-[10px] text-orange-500"></i> Disapprove
                                </a>
                                <div className="h-px bg-gray-100 my-1"></div>
                                <a
                                  href="#"
                                  onClick={(e) => selectAction(e, item.id, 'Deleted')}
                                  className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 rounded-lg hover:bg-red-50 transition"
                                >
                                  <i className="fas fa-trash-alt text-[10px] text-red-500"></i> Delete
                                </a>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls System Section layout */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600 border-t border-gray-100 pt-4">
              <div>
                Showing {displayStart}-{displayEnd} out of {totalResultCount} result
              </div>
              
              {totalPages > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => changePage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1.5 font-medium transition ${
                      currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:text-[#161a2b]'
                    }`}
                  >
                    Prev.
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => {
                    if (pageNumber === currentPage) {
                      return (
                        <button
                          key={pageNumber}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#161a2b] text-white font-medium"
                        >
                          {pageNumber}
                        </button>
                      );
                    }
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => changePage(pageNumber)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-gray-400 font-medium transition"
                      >
                        {pageNumber}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => changePage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1.5 font-medium transition ${
                      currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'hover:text-[#161a2b]'
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Global Bottom-Right Alerts Toast Status Window Node Rendering */}
      <div
        id="toast"
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 lg:left-auto lg:right-8 lg:translate-x-0 z-50 flex items-center p-4 space-x-3 w-max max-w-xs bg-white rounded-xl shadow-2xl border-l-4 transition-all duration-300 ease-in-out ${
          toast.visible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2 pointer-events-none'
        } ${
          toast.type === 'Approved'
            ? 'border-green-500'
            : toast.type === 'Disapproved'
            ? 'border-orange-500'
            : toast.type === 'Deleted'
            ? 'border-red-500'
            : 'border-gray-400'
        }`}
        role="alert"
      >
        <div
          className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg text-white shadow-sm ${
            toast.type === 'Approved'
              ? 'bg-green-500'
              : toast.type === 'Disapproved'
              ? 'bg-orange-500'
              : toast.type === 'Deleted'
              ? 'bg-red-500'
              : 'bg-gray-400'
          }`}
        >
          <i
            className={`fas ${
              toast.type === 'Approved'
                ? 'fa-check'
                : toast.type === 'Disapproved'
                ? 'fa-times'
                : toast.type === 'Deleted'
                ? 'fa-trash'
                : 'fa-info'
            }`}
          ></i>
        </div>
        <div className="ml-3 text-sm font-semibold text-gray-800">
          {toast.message}
        </div>
      </div>
    </>
  );
};

export default AgentCustomerIquiry;

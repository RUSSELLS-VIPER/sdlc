import UserNotificationsData from "../../components/Dashboard/userDashboard/UserNotificationsData";
import type { NotificationsData } from "../../type/interface/userDashboard/userDashboard.interface";


const Notification = () => {
    const filterTabs = [
    { id: 1, label: "All Notifications", iconClass: "fa-regular fa-bell" },
    { id: 2, label: "Unread", iconClass: "fa-regular fa-comment" },
    { id: 3, label: "New Leads", iconClass: "fa-solid fa-user-plus" },
    { id: 4, label: "Messages", iconClass: "fa-regular fa-envelope" },
    { id: 5, label: "Appointments", iconClass: "fa-regular fa-calendar" },
    { id: 6, label: "Property Alerts", iconClass: "fa-regular fa-house" },
  ];

  const notificationsData:NotificationsData[] = [
    {
      id: 1,
      title: "New Lead Received",
      description: "Sarah Johnson Is Interested In “Modern Family Home In Downtown”",
      time: "2 Min Ago",
      isUnread: true,
      iconClass: "fa-regular fa-user",
      iconBgClass: "bg-purple-100 text-purple-500",
    },
    {
      id: 2,
      title: "new message",
      description: "mike devis sent you a message about “luxury apartment in city\"",
      time: "10 Min Ago",
      isUnread: true,
      iconClass: "fa-regular fa-comment",
      iconBgClass: "bg-purple-100 text-purple-500",
    },
    {
      id: 3,
      title: "price update alert",
      description: "Sarah Johnson Is Interested In “Modern Family Home In Downtown”",
      time: "15 Min Ago",
      isUnread: true,
      iconClass: "fa-regular fa-home",
      iconBgClass: "bg-yellow-100 text-yellow-500",
    },
    {
      id: 4,
      title: "New inquiry",
      description: "Sarah Johnson Is Interested In “Modern Family Home In Downtown”",
      time: "1 day Ago",
      isUnread: false,
      iconClass: "fa-regular fa-message",
      iconBgClass: "bg-purple-100 text-purple-500",
    },
    {
      id: 5,
      title: "appointment reminder",
      description: "Sarah Johnson Is Interested In “Modern Family Home In Downtown”",
      time: "2 day Ago",
      isUnread: false,
      iconClass: "fa-regular fa-calendar",
      iconBgClass: "bg-yellow-100 text-yellow-500",
    },
    {
      id: 6,
      title: "New Lead Received",
      description: "Sarah Johnson Is Interested In “Modern Family Home In Downtown”",
      time: "2 Day Ago",
      isUnread: false,
      iconClass: "fa-regular fa-user",
      iconBgClass: "bg-purple-100 text-purple-500",
    },
  ];
  return (
    <>
    {/* section 2 start */}
      <section>
        <div className="w-full mx-auto antialiased">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Filter Actions Sidebar Container */}
            <div className="lg:col-span-4 flex overflow-x-auto lg:overflow-x-visible lg:flex-col gap-4 pb-4 lg:pb-0 scrollbar-none lg:sticky lg:top-8">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  className="flex justify-center items-center gap-4 shrink-0 px-24 py-8 rounded-2xl text-base md:text-lg font-bold tracking-wide text-[#14213D] bg-white border border-[#fca311]/80 lg:w-full text-left transition-all duration-300 [background-image:none] hover:[background-image:linear-gradient(to_right,#F8FEFF,#FCA311)]"
                >
                  <i className={`${tab.iconClass} text-2xl`}></i>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Right Notifications Cards List Scroller */}
            <div className="lg:col-span-8 max-h-[780px] overflow-y-auto pr-3 space-y-6 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {notificationsData.map((notification) => (
                <UserNotificationsData notification={notification} key={notification.id} />
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default Notification
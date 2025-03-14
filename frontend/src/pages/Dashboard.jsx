import React , {useState} from "react";
import Applications from "../components/Applications";
import Navbar from "../components/Navbar";
import Notes from "../components/Notes";
import Resume from "../components/Resume";
import Tabs from "./Tabs";
const Dashboard = () => {
    const [activeTab, setActiveTab] = useState(0);
    const tabs = [
      {
        title: "Applications",
        component: <Applications setActiveTab={setActiveTab} />,
      },
      { title: "Resume", component: <Resume setActiveTab={setActiveTab} /> },
    ];
    return (
      <div>
        <>
          <Navbar />
          <div className="lg:flex min-h-screen bg-[#F0FFFF] poppins pt-4 md:pt-0">
            <div className="lg:w-2/3 h-full poppins">
              <Tabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>
            <div className="lg:w-1/3 border-l-0 lg:border-l border-[#02182B]">
              <Notes />
            </div>
          </div>
        </>
      </div>
    );
  };
  
export default Dashboard;
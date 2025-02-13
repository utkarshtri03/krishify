import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import SubHeader from "./components/SubHeader";
import SubHeader2 from "./components/SubHeader2";
import Card from "./components/Card";
import Breadcrumb from "./components/BredCrumb";
import RenameModal from "./components/RenameModal";
import MoveModal from "./components/MoveModal";

function App() {
  const [tabs, setTabs] = useState([]);
  const [tabsObj, setTabsObj] = useState([]);
  const [selectedTabId, setSelectedTabId] = useState(null);
  const [groupLevels, setGroupLevels] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isMoveOpen, setIsMoveOpen] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  console.log(selectedTabId, "Selected Tab ID");

  // Fetch Base Group (Tabs)
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        "https://api.krishify.com/api/v1/client-group/dummy-basegroup?client_id=8abb243f-eb94-4637-8838-b263351944de",
        {
          headers: { "User-Agent": "insomnia/10.2.0" },
        }
      )
      .then((response) => {
        setTabsObj(response.data);
        setTabs(response.data.map((item) => item.name));

        if (response.data.length > 0) {
          const firstTabId = response.data[0]?.id || null;
          setSelectedTabId(firstTabId);
        }
      })
      .catch((error) => console.error("Error fetching base group:", error))
      .finally(() => setIsLoading(false));
  }, []);

  // Fetch Group Levels when selectedTabId changes
  useEffect(() => {
    if (selectedTabId === null || selectedTabId === undefined) {
      setGroupLevels([]); // Ensure data is cleared
      return;
    }

    setIsLoading(true);
    axios
      .get(
        `https://api.krishify.com/api/v1/client-group/dummy-groupslevel?level_id=${selectedTabId}`,
        {
          headers: { "User-Agent": "insomnia/10.2.0" },
        }
      )
      .then((response) => {
        setGroupLevels(response.data);
      })
      .catch((error) => {
        console.error("Error fetching group levels:", error);
        setGroupLevels([]); // Ensure data is cleared on error
      })
      .finally(() => setIsLoading(false));
  }, [selectedTabId]);

  // Handle tab selection
  const handleTabClick = (tabName) => {
    const selectedTab = tabsObj.find((tab) => tab.name === tabName);
    if (selectedTab) {
      setSelectedTabId(selectedTab.id);
      setBreadcrumbs([]);
    } else {
      setSelectedTabId(null);
      setGroupLevels([]); // Clear data if no valid tab is selected
    }
  };

  // Handle card click to fetch child groups
  const handleCardClick = (group) => {
    setIsLoading(true);
    axios
      .get(
        `https://api.krishify.com/api/v1/client-group/dummy-groupchild?parent_id=${group.id}`,
        {
          headers: { "User-Agent": "insomnia/10.2.0" },
        }
      )
      .then((response) => {
        setGroupLevels(response.data);
        setBreadcrumbs([...breadcrumbs, { name: group.name, id: group.id }]);
      })
      .catch((error) => console.error("Error fetching child groups:", error))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex flex-row w-[100%] bg-[#F5F5F5] h-screen ">
      <div className="w-[18%] ">
        <Sidebar />
      </div>
      <div className="w-[100%]">
        <Header />

        {/* Show SubHeader & SubHeader2 only at the top level */}
        {breadcrumbs.length === 0 && (
          <>
            <SubHeader
              tabs={tabs}
              setTabs={setTabs}
              onTabClick={handleTabClick}
            />
            <SubHeader2 name={groupLevels[0]?.level_name} count={groupLevels?.length} />
          </>
        )}

        {/* Show Breadcrumbs only when navigating deeper */}
        {breadcrumbs.length > 0 && (
          <Breadcrumb
            items={breadcrumbs}
            onClick={(breadcrumb) => {
              const newBreadcrumbs = breadcrumbs.slice(0, breadcrumbs.indexOf(breadcrumb) + 1);
              setSelectedTabId(breadcrumb.id);
              setBreadcrumbs(newBreadcrumbs);

              setIsLoading(true);
              axios
                .get(
                  `https://api.krishify.com/api/v1/client-group/dummy-groupslevel?level_id=${breadcrumb.id}`,
                  {
                    headers: { "User-Agent": "insomnia/10.2.0" },
                  }
                )
                .then((response) => {
                  setGroupLevels(response.data);
                })
                .catch((error) =>
                  console.error("Error fetching previous group levels:", error)
                )
                .finally(() => setIsLoading(false));
            }}
            onBack={() => {
              if (breadcrumbs.length > 1) {
                const newBreadcrumbs = breadcrumbs.slice(0, -1);
                const previousBreadcrumb = newBreadcrumbs[newBreadcrumbs.length - 1];

                setSelectedTabId(previousBreadcrumb.id);
                setBreadcrumbs(newBreadcrumbs);

                setIsLoading(true);
                axios
                  .get(
                    `https://api.krishify.com/api/v1/client-group/dummy-groupslevel?level_id=${previousBreadcrumb.id}`,
                    {
                      headers: { "User-Agent": "insomnia/10.2.0" },
                    }
                  )
                  .then((response) => {
                    setGroupLevels(response.data);
                  })
                  .catch((error) =>
                    console.error("Error fetching previous group levels:", error)
                  )
                  .finally(() => setIsLoading(false));
              } else {
                setSelectedTabId(null);
                setBreadcrumbs([]);
                setGroupLevels([]);
              }
            }}
          />
        )}

        {/* Loader */}
        {isLoading && (
          <div className="flex justify-center items-center h-[200px]">
            <span className="text-gray-500 text-lg">Loading...</span>
          </div>
        )}

        {/* No Data Available */}
        {!isLoading && groupLevels.length === 0 && (
          <div className="flex justify-center items-center h-[200px]">
            <span className="text-gray-500 text-lg">No Data Available</span>
          </div>
        )}

        {/* Cards Section */}
        {!isLoading && groupLevels.length > 0 && (
          <div className="flex flex-wrap px-10 pt-6 gap-4 bg-[#F5F5F5] ">
            {groupLevels.map((group, index) => (
              <Card
                key={group.id || index}
                id={group.code}
                title={group.name}
                level={group.level}
                img={group?.image}
                location={group?.location_name}
                hierarchy={[group.level_name, group.parent?.name || ""]}
                onClick={group.level === 0 ? null : () => handleCardClick(group)}
                onRename={() => {
                  setIsRenameOpen(true);
                  setRenameValue(group.name);
                }}
                onMove={() => {
                  setIsMoveOpen(true);
                  setSelectedCard(group.name);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Rename Modal */}
      <RenameModal isOpen={isRenameOpen} onClose={() => setIsRenameOpen(false)} renameValue={renameValue} setRenameValue={setRenameValue} onRename={() => setIsRenameOpen(false)} />

      {/* Move Modal */}
      <MoveModal isOpen={isMoveOpen} onClose={() => setIsMoveOpen(false)} onMove={() => setIsMoveOpen(false)} renameValue={renameValue} />
    </div>
  );
}

export default App;

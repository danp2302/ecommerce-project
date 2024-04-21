import Products from "./components/products";
import { ActionFeedbackProvider } from "./context/actionFeedbackContext";
import ActionFeedback from "./components/actionFeedback";
import ItemsInBasket from "./components/itemsInBasket";
import TotalCost from "./components/totalCost";
import WebsiteLogo from "./components/websiteLogo";
import Title from "./components/title";
import SearchBar from "./components/searchBar";
export default function Home() {
  return (
    <ActionFeedbackProvider>
      <div className="w-full px-10 mb-10">
        <ActionFeedback />
        <div className="flex flex-wrap mt-5 mb-10">
          <div className="w-full md:w-1/3 px-2 flex">
            <WebsiteLogo />
          </div>
          <div className="w-full md:w-2/3 px-2 flex">
            <div className="border p-10 bg-slate-200 w-full flex justify-between items-center">
              <div>
                <Title />
                <SearchBar />
              </div>
              <div className="flex items-center">
                <ItemsInBasket />
                <TotalCost />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="grid grid-cols-4 gap-3">
            <Products />
          </div>
        </div>
      </div>
    </ActionFeedbackProvider>
  );
}

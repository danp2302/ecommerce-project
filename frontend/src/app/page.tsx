import Products from "./products/page";
import { ActionFeedbackProvider } from "./context/actionFeedbackContext";
import ActionFeedback from "./components/actionFeedback";
import ItemsInBasket from "./components/itemsInBasket";
import TotalCost from "./components/totalCost";
import WebsiteLogo from "./components/websiteLogo";
import Title from "./components/title";
import SearchBar from "./components/searchBar";
import { ProductProvider } from "./context/productsContext";
import { SearchProvider } from "./context/searchContext";
// import { Accordion } from "./components/accordion";

export default function Home() {
  return (
    <SearchProvider>
      <ProductProvider>
        <ActionFeedbackProvider>
          <div className="w-full px-5 md:px-10 mb-10">
            <ActionFeedback />
            <div className="flex flex-wrap mt-5 mb-10">
              <div className="w-full md:w-1/3 px-2 flex">
                <WebsiteLogo />
              </div>
              <div className="w-full md:w-2/3 px-2 flex justify-center">
                <div className="border-solid border-2 border-indigo-300 rounded-lg p-5 md:p-5 bg-slate-200 w-full flex flex-col items-center">
                  <Title />
                  <div className="flex flex-col lg:flex-row items-center justify-between w-full mt-4">
                    <div className="flex flex-col items-center justify-center lg:flex-row lg:items-center lg:w-auto">
                      <div className="mt-2">
                        <SearchBar />
                      </div>
                    </div>
                    <div className="flex items-center ml-2 lg:ml-4">
                      <ItemsInBasket />
                      <TotalCost />
                    </div>
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
      </ProductProvider>
    </SearchProvider>
  );
}

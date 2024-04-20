import Products from "./components/products";
import { ActionFeedbackProvider } from "./context/actionFeedbackContext";
import ActionFeedback from "./components/actionFeedback";
import ItemsInBasket from "./components/itemsInBasket";
import TotalCost from "./components/totalCost";
import TitleBar from "./components/titleBar";
export default function Home() {
  return (
    <ActionFeedbackProvider>
      <div className="w-full px-10 mb-10">
        <ActionFeedback />
        <div className="flex flex-wrap -mx-2 mt-10 mb-10">
          <div className="w-full md:w-2/3 px-2">
            <TitleBar />
          </div>
          <div className="w-full md:w-1/3 px-10 flex items-center justify-start">
            <div className="flex items-center">
              <ItemsInBasket />
              <TotalCost />
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

import DashboardPage from "./dashboard/page";
import CustomCarousel from "@/components/PopularProduct";
import Chatbot from "@/components/ChatBot";


export default function HomePage() {
  return (
    <div>
      <DashboardPage/>
      <CustomCarousel/>
      <Chatbot/>
    </div>
  );
}


import Image from "next/image";
import styles from "./page.module.css";
import DashboardPage from "./dashboard/page";
import CustomCarousel from "@/components/PopularProduct";

export default function HomePage() {
  return (
    <div>
      <DashboardPage/>
      <CustomCarousel/>
    </div>
  );
}


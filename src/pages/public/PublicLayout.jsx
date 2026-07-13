import { Outlet } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

export default function PublicLayout() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-x-0 top-0 z-50 flex justify-center">
        <Header />
      </div>

      <main className="flex w-full flex-1 flex-col items-center">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

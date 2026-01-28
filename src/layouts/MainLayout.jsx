import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="bg-[#141414] min-h-screen">
      <Header /> {/* Now hooks inside Header will work! */}
      <main>
        <Outlet /> {/* This renders Home, Search, or MovieDetails */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

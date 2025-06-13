import { Route, Routes } from "react-router";
// import AuthLayout from "../shared/ui/auth-layout";
import AppLayout from "@/shared/ui/app-layout";
import HomePage from "@/pages/home/home-page";
import FightPage from "@/pages/fight/fight-page";
import FightVotePage from "@/pages/fight/fight-vote-page";
import { RegisterPage } from "@/pages/auth/register-page";
import { ProfilePage } from "@/pages/auth/profile-page";
import { LoginPage } from "@/pages/auth/login-page";
import ProductPage from "@/pages/product/product-page";
import FighterPage from "@/pages/foghter/fighter-page";
import AdminPanelLayout from "@/shared/ui/admin-panel-layout";
import AddProductPage from "@/pages/add-product/add-product-page";
import Authentication from "./providers/authenication-provider";
import AddFighterPage from "@/pages/add-fighter";
import EditFighterPage from "@/pages/edit-fighter/edit-fighter-page";
import EditProductPage from "@/pages/edit-product.tsx/edit-product-page";
import AddFightPage from "@/pages/add-fight/add-fight-page";
import EditFightPage from "@/pages/edit-fight/edit-fight-page";
import FightAdminPage from "@/pages/fight-admin/fight-admin-page";
import FightAdminVotePage from "@/pages/fight-admin/fight-admin-vote-page";
import AddArtPage from "@/pages/add-art/add-art-page";
import ArtPage from "@/pages/art/art-page";
import EditProfilePage from "@/pages/edit-profile/edit-profile-page";
import BasketPage from "@/pages/basket/basket-page";
import OfferBasket from "@/pages/offer-basket/offer-basket";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />

        <Route path="/fight" element={<FightPage />} />
        <Route path="/fight/:fightId" element={<FightVotePage />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/product" element={<ProductPage />} />
        <Route path="/offer/:price" element={<OfferBasket />} />
        <Route path="/fighter" element={<FighterPage />} />
        <Route path="/art" element={<ArtPage />} />
        <Route path="/basket" element={<BasketPage />} />

        <Route path="/edit-profile" element={<EditProfilePage />} />
        {/* <Route
          path="profile"
          element={
            <Authentication>
              <ProfilePage />
            </Authentication>
          } */}
      </Route>

      <Route element={<AdminPanelLayout />}>
        <Route
          path="/admin/add-product"
          element={
            <Authentication>
              <AddProductPage />
            </Authentication>
          }
        />
        <Route
          path="/admin/add-fighter"
          element={
            <Authentication>
              <AddFighterPage />
            </Authentication>
          }
        />
        <Route
          path="/admin/edit-fighter/:fighterId"
          element={
            <Authentication>
              <EditFighterPage />
            </Authentication>
          }
        />

        <Route
          path="/admin/add-product"
          element={
            <Authentication>
              <AddProductPage />
            </Authentication>
          }
        />

        <Route
          path="/admin/edit-product/:productId"
          element={
            <Authentication>
              <EditProductPage />
            </Authentication>
          }
        />

        <Route
          path="/admin/add-fight"
          element={
            <Authentication>
              <AddFightPage />
            </Authentication>
          }
        />

        <Route
          path="/admin/edit-fight/:fightId"
          element={
            <Authentication>
              <EditFightPage />
            </Authentication>
          }
        />

        <Route
          path="/admin/add-vote"
          element={
            <Authentication>
              <FightAdminPage />
            </Authentication>
          }
        />

        <Route
          path="/admin/fight-vote/:fightId"
          element={
            <Authentication>
              <FightAdminVotePage />
            </Authentication>
          }
        />

        <Route
          path="/admin/add-art"
          element={
            <Authentication>
              <AddArtPage />
            </Authentication>
          }
        />
      </Route>

      {/* <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      <Route path="*" element={<NotFound />} /> */}
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;

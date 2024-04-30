import { ModulesProvider, useEffect, useParams, useState } from "alem";
import Nav from "./components/Nav/Nav";
import Routes from "./routes/Routes";
// import DonationsInfoProvider from "./contexts/DonationsInfoProvider";
import Banner from "./components/Banner/Banner";
import ModalSuccess from "./modals/ModalSuccess/ModalSuccess";
import DonationModalProvider from "./contexts/DonationModalProvider";
import ModalDonation from "./modals/ModalDonation";

const Main = () => {
  const { transactionHashes: _transactionHashes } = useParams();

  const { successfulDonation, donationModalProps } = DonationModalProvider();

  return (
    // <DonationsInfoProvider>
    <>
      <ModulesProvider />
      <Nav />
      <div className="app-content">
        <Routes />
      </div>
      <Banner />
      {(successfulDonation || _transactionHashes) && <ModalSuccess />}
      {donationModalProps && <ModalDonation />}
    </>
    // </DonationsInfoProvider>
  );
};

export default Main;

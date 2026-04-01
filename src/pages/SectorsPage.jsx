import { MarketDataProvider } from "../context/MarketDataContext";
import SectorsPageContent from "../components/sectors/SectorsPageContent";

const SectorsPage = () => {
  return (
    <MarketDataProvider>
      <SectorsPageContent />
    </MarketDataProvider>
  );
};

export default SectorsPage;

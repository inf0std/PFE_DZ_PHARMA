import { useDispatch, useSelector } from "react-redux";
import { useFetchPharmaciesQuery } from "../../service/api/pharmacyApi";
import DataTable from "../../componant/table";
import { useEffect } from "react";

const PharmaciesPage = (props) => {
  const { data: pharmacies, error, isLoading } = useFetchPharmaciesQuery({});
  const parsePharmacies = (data) => {
    return data?.map((pharma) => ({
      id: pharma.pharmcie_id,
      Nom: pharma.name,
      Proprietaire: pharma.username,
      Latitude: pharma.latitude,
      Longitude: pharma.longitude,
      Telephone: pharma.phone,
    }));
  };
  useEffect(() => {
    console.log(pharmacies);
  }, [pharmacies]);

  return (
    <>
      {pharmacies && (
        <DataTable
          data={parsePharmacies(pharmacies)}
          detailsF={(id) => {
            console.log(id);
          }}
        />
      )}
    </>
  );
};

export default PharmaciesPage;

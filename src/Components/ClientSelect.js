import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Sku from "./Sku";

function ClientSelect() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [skus, setSkus] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = token;
    const baseUrl = `http://216.230.74.17:8013/api/Client`;
    axios
      .get(baseUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setClients(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedClient) {
      setSkus([]);
      return;
    }
    setIsLoading(true);
    const accessToken = token;
    const skuClientData = `http://216.230.74.17:8013/api/Sku?clientId=${selectedClient}`;
    axios
      .get(skuClientData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setSkus(res.data);
        console.log(res.data?.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
        navigate('/admin');
      });
      localStorage.setItem("selectedClient", selectedClient);
  };

  console.log(selectedClient);
  return (
    <div>
      <h3
        style={{
          margin: "auto",
          minHeight: "250px",
          boxShadow: "0px 0px 20px grey ",
          borderRadius: "50px",
          marginTop: "10em",
          width: "30em",
        }}
      >
        <br />
        <center>
          <h3 style={{ color: "purple" }}>Select Client</h3>
        </center>
        <center>
          <br />
          <form onSubmit={handleSubmit}>
            <select value={selectedClient} onChange={(event) => setSelectedClient(event.target.value)}>
              <option value="">Select a client</option>
              {clients?.map((c) => (
              <option value={c?.uniqueid} key={c?.uniqueid}>
              {c?.clientname}
            </option>
              ))}
            </select>
            <br />
            <br />
            <button style={{ color: "white", backgroundColor: "blue", padding: "5px 15px 5px 18px" }}>Submit</button>
          </form>
        </center>
        {isLoading && (
          <p style={{ color: "white", backgroundColor: "blue", padding: "5px 15px 4px 18px" }}>Loading...</p>
        )}
        {skus.length > 0 && !isLoading && (
          <>
            <hr />
            <h3>SKUs for selected client:</h3>
            <ul>
              {skus.map((sku) => (
                <li key={sku.id}>{sku.name}</li>
              ))}
            </ul>
          </>
        )}
      </h3>
      {/* <Sku clientId={selectedClient}/> */}
    </div>
  );
}

export default ClientSelect;

import { useState, useEffect } from "react";
import yelp from "../api/yelp";

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrormessage] = useState("");

  const searchApi = async searchTerm => {
    console.log("hi there");

    try {
      const response = await yelp.get("/search", {
        params: {
          limit: 50,
          term: searchTerm,
          location: "Seattle"
        }
      });

      setResults(response.data.businesses);
    } catch (err) {
      setErrormessage("Something Went Wrong!!");
      console.log(err);
    }
  };
  // searchApi("pasta");
  useEffect(() => {
    searchApi("pasta");
  }, []);

  return [searchApi, results, errorMessage];
};

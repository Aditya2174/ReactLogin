import React, { useState } from "react";
import { useEffect } from "react";
import "./Product.css";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import CircularProgress from "@mui/joy/CircularProgress";
import ReviewComponent from "./ReviewComponent";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import useAuth from "./useAuth";
import { signOut, getAuth } from "firebase/auth";
import { app } from "./firebase.config";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";



async function dataReturn() {
  const fetchData = await fetch("http://localhost:8000/MacBook Pro", {
    method: "GET",
  });

  const dataRes = await fetchData.json();

  return dataRes;
}

function Product() {
  const user = useAuth();
  const auth = getAuth(app);
  if (user) {
    user
      .getIdToken()
      .then((authToken) => {
        console.log("Authentication token:", authToken);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
  const [review, setReview] = useState("");
  const handler = async (event) => {
    event.preventDefault();
    setReview(event.target.value);
  };
  const [nul, setNul] = useState(0);
  const [Data, setData] = useState({ alert: true, positive: [], negative: [] });

  useEffect(() => {
    const fetchData = async () => {
      const response = await dataReturn();
      setData(response);
    };

    fetchData();
  }, []);

  return (
    <div className="product">
      <div className="prodfst">
        <img
          className="lappy"
          src={require("./assets/air.png")}
          alt="laptop-img"
        />
        <div className="prodrightmain">
          <h1>Apple Air M1</h1>
          <div className="prodprog">
            <div className="progressCirc">
                <Stack spacing={2}>
                  <CircularProgress
                    size="lg"
                    determinate
                    value={70}
                    color={70>50?"success":"danger"}
                    sx={{ "--CircularProgress-size": "150px" }}
                  >
                    <Typography sx={{ fontSize: "50px", fontWeight: "700",  }}>
                      70%
                    </Typography>
                  </CircularProgress>
                </Stack>
            </div>
          <div className="prodcatr">
            <div className="item4">
              Battery
                <Rating
                  name="read-only"
                  value={3}
                  precision={0.5}
                  size="large"
                  readOnly
                />
            
            </div>
            <div className="item4">
              Processor 
                <Rating
                  name="read-only"
                  value={4}
                  precision={0.5}
                  size="large"
                  readOnly
                />
            
            </div>
            <div className="item4">
              Display
                <Rating
                  name="read-only"
                  value={4.5}
                  precision={0.5}
                  size="large"
                  readOnly
                />
            
            </div>
            <div className="item4">
              Gaming 
                <Rating
                  name="read-only"
                  value={2.5}
                  precision={0.5}
                  size="large"
                  readOnly
                />
            
            </div>
            <div className="item4">
              Sound 
                <Rating
                  name="read-only"
                  value={1}
                  precision={0.5}
                  size="large"
                  readOnly
                />
            
            </div>
          </div>
          </div>
        </div>
      </div>
      <h4 style={{backgroundImage:"linear-gradient(white, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0))", height:"150px", fontWeight:"600"}}>Reviews</h4>
      <div className="prorev">
        <div className="pro-div">
          <h4>Positive</h4>
          <div className="prod-rev">
            {Data.positive.map((item) => (
              <ReviewComponent
                review={"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta architecto laboriosam molestias possimus ab. Eveniet illum eaque voluptatum nulla facilis sed consequatur sint fugiat numquam accusantium, ipsum quidem voluptate dolor fugit, nam placeat amet officia quos. Doloribus fugiat eius porro amet delectus architecto expedita, aspernatur eveniet perferendis ipsum adipisci ipsa quod autem distinctio, tenetur, tempore eaque accusantium perspiciatis! Perspiciatis, aperiam!"}
                score={item.score}
                username={item.username}
                date={item.date}
              />
            ))}
          </div>
        </div>

        <div className="pro-div">
          <h4>Negative</h4>
          <div className="prod-rev">
            {Data.negative.map((item) => (
              <ReviewComponent
                review={item.review}
                score={item.score}
                username={item.username}
                date={item.date}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="inputreview">
        <h4>Tell us what you feel about this Laptop?</h4>
        <div className="reviewInput">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "100ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="filled-multiline-flexible"
                label="Your Review"
                multiline
                maxRows={4}
                variant="filled"
                value={review}
                onInput={handler}
              />
            </div>
          </Box>
        </div>
        <Button variant="outlined" sx={{ color: "black" }}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default Product;

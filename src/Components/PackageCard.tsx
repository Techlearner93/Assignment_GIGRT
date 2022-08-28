import React from "react";
import moment from "moment";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";

interface Props {
  registry: any;
}

export const PackageCard: React.FC<Props> = ({ registry }) => {
  return (
    <Card
      sx={{
        borderRadius: "10px",
        boxShadow: 3,
        margin: "10px",
        textAlign: "center",
        border: "solid lightgrey 1px",
      }}
    >
      <CardHeader
        title={registry["package"]["name"]}
        subheader={registry["package"]["author"]["name"]}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {`Last updated on ${moment(registry["package"]["date"]).format(
            "MMMM Do YYYY"
          )}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            const url = `https://www.npmjs.com/package/${registry["package"]["name"]}`;
            window.open(url);
          }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

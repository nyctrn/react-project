import { useState, useContext } from "react";
import AuthContext from "../../context/authContext";
import { Divider, Paper } from "@material-ui/core/";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import Check from "@material-ui/icons/Check";
import Typography from "@material-ui/core/Typography";
import Close from "@material-ui/icons/Close";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

const SingleApplication = ({ applicant }) => {
  const authContext = useContext(AuthContext);
  const {
    error,
    acceptApplications,
    rejectApplications,
    showSingleApplication,
  } = authContext;

  const [declineOrRejectSuccess, setDeclineOrRejectSuccess] = useState(null);
  const [applStatus, setApplStatus] = useState(applicant.application.status);

  const handleApplications = async (event) => {
    if (event.target.innerText === "ΕΓΚΡΙΣΗ") {
      acceptApplications({
        // _id: applicant._id, (test for error handling)
        _id: applicant._id,
        status: "δεκτή",
      });

      setApplStatus("δεκτή");
    } else {
      rejectApplications({
        _id: applicant._id,
        status: "μη δεκτή",
      });
      setApplStatus("μη δεκτή");
    }

    await error;

    if (!error) {
      setDeclineOrRejectSuccess(true);

      setTimeout(() => {
        setDeclineOrRejectSuccess(null);
      }, 2000);
    }
    if (error) {
      setDeclineOrRejectSuccess(false);
      setTimeout(() => {
        setDeclineOrRejectSuccess(null);
      }, 2000);
      setApplStatus("υπήρξε κάποιο σφάλμα");
    }
  };

  const formatDate = (date) => {
    let datePart = date.match(/\d+/g),
      year = datePart[0].substring(2),
      month = datePart[1],
      day = datePart[2];

    return day + "/" + month + "/" + year;
  };

  return (
    <Container style={{ height: "100vh" }} maxWidth="lg">
      <Paper style={{ marginTop: "1rem", height: "85%" }}>
        <div style={{ padding: "1rem" }}>
          <h2>
            Κατάσταση αίτησης με κωδικό: {applicant.application.applicationId} -{" "}
            {applStatus}
          </h2>
          <h2 style={{ paddingBottom: "1rem" }}>Στοιχεία πολίτη:</h2>
          {/* <hr /> */}
          <div style={{ paddingBottom: "1rem" }}>
            <ul style={{ listStyle: "none", fontSize: "1.3rem" }}>
              <li>
                <p>
                  Όνοματεπώνυμο: {applicant.application.firstName}{" "}
                  {applicant.application.lastName}
                  <Divider />
                </p>
              </li>
              <li>
                <p>
                  Πατρώνυμο: {applicant.application.fName}
                  <Divider />
                </p>
              </li>
              <li>
                <p>
                  Μητρώνυμο: {applicant.application.mName}
                  <Divider />
                </p>
              </li>
              <li>
                <p>
                  ΑΦΜ {applicant.application.afm}
                  <Divider />
                </p>
              </li>
              <li>
                <p>
                  ΑΜΚΑ: {applicant.application.amka}
                  <Divider />
                </p>
              </li>
              <li>
                <p>
                  Ημερομηνία Γέννησης:{" "}
                  {formatDate(applicant.application.birthday)}
                  <Divider />
                </p>
              </li>
              <li>
                <p>
                  Υπηκοότητα: {applicant.application.citizenship}
                  <Divider />
                </p>
              </li>
              <li>
                <p>
                  Αριθμός Ταυτότητας/Διαβατηρίου:{" "}
                  {applicant.application.idNumber}
                  <Divider />
                </p>
              </li>
              <li>
                <p>
                  Δήμος: {applicant.application.municipality}
                  <Divider />
                </p>
              </li>
              <li>
                <p>
                  Πόλη: {applicant.application.city}
                  <Divider />
                </p>
              </li>
              <li>
                <p>
                  Διεύθυνση κατοικίας: {applicant.application.address}
                  <Divider />
                </p>
              </li>
              <li>
                <p>
                  Τ.Κ.: {applicant.application.postalCode}
                  <Divider />
                </p>
              </li>
              <li>
                <p>Τηλέφωνο: {applicant.application.phoneNumber}</p>
                <Divider />
              </li>
              <li>
                <p>
                  Κινητό: {applicant.application.mobileNumber}
                  <Divider />
                </p>
              </li>
              <li>
                <p>
                  E-mail: {applicant.application.email}
                  <Divider />
                </p>
              </li>
            </ul>
          </div>

          <Button
            id="1"
            onClick={(e) => handleApplications(e)}
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#4caf50", float: "left" }}
            startIcon={<ThumbUpIcon />}
          >
            ΕΓΚΡΙΣΗ
          </Button>

          <Button
            onClick={(e) => handleApplications(e)}
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#e91e63", float: "right" }}
            startIcon={<ThumbDownIcon />}
          >
            ΑΠΟΡΡΙΨΗ
          </Button>

          <Button
            onClick={() => showSingleApplication(false)}
            variant="contained"
            color="primary"
            style={{ top: "20%" }}
            component={Link}
            to={"/applications"}
            startIcon={<ArrowBackIcon />}
          >
            ΕΠΙΣΤΡΟΦΗ
          </Button>
          <div style={{ paddingTop: "1.5rem" }}>
            {declineOrRejectSuccess && (
              <>
                <Typography component="h1" variant="h6">
                  Επεξεργασία αίτησης επιτυχής!
                  <Check
                    style={{
                      color: "#4caf50",
                      verticalAlign: "bottom",
                      fontSize: "2rem",
                    }}
                  />
                </Typography>
              </>
            )}

            {declineOrRejectSuccess === false && (
              <>
                <Typography component="h1" variant="h5">
                  υπήρξε κάποια σφάλμα
                  <Close
                    style={{
                      color: "red",
                      verticalAlign: "bottom",
                      fontSize: "2rem",
                    }}
                  />
                </Typography>
              </>
            )}
          </div>
        </div>
      </Paper>
    </Container>
  );
};

export default SingleApplication;

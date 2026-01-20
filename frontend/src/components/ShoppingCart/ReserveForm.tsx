import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Backdrop
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useModalStore } from "./useModalStore";

// Stylizacja modala
const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  minWidth: 400,
};

// Schemat walidacji - idealny do Twoich 20 testów jednostkowych (Unit Tests)
export const validationSchema = Yup.object({
  firstName: Yup.string().min(2, "Too short").max(50, "Too long").required("Required"),
  lastName: Yup.string().required("Required").max(50, "Too long"),
  address: Yup.string().required("Required"),
  phone: Yup.string().matches(/^[0-9]+$/, "Must be only digits").min(9, "Min 9 digits").required("Required"),
  email: Yup.string().email("Invalid email address").required("Required").max(50, "Too long"),
});

const ReserveForm = () => {
  const isOpen = useModalStore(state => state.isReserveOpen);
  const closeReserve = useModalStore(state => state.closeReserve);

  const handleClose = () => {
    closeReserve();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="reserve-modal-title"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
          sx: {
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0,0,0,0.3)"
          }
        }
      }}
    >
      <Box sx={modalStyle}>
        <Typography id="reserve-modal-title" variant="h6" component="h2" mb={2} textAlign="center">
          Finalizacja rezerwacji
        </Typography>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            address: "",
            phone: "",
            email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            // Logika po kliknięciu Submit
            alert(`Zamówiono! Dziękujemy, ${values.firstName} ${values.lastName}. Twoje rośliny są już zarezerwowane.`);
            
            console.log("Dane zamówienia:", values);
            
            // Symulacja zakończenia procesu
            actions.setSubmitting(false);
            actions.resetForm();
            handleClose(); 
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Field
                as={TextField}
                label="Imię"
                name="firstName"
                fullWidth
                margin="normal"
                variant="outlined"
                error={touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
              />
              <Field
                as={TextField}
                label="Nazwisko"
                name="lastName"
                fullWidth
                margin="normal"
                error={touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
              />
              <Field
                as={TextField}
                label="Adres dostawy"
                name="address"
                fullWidth
                margin="normal"
                error={touched.address && !!errors.address}
                helperText={touched.address && errors.address}
              />
              <Field
                as={TextField}
                label="Numer telefonu"
                name="phone"
                fullWidth
                margin="normal"
                error={touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
              />
              <Field
                as={TextField}
                label="Email"
                name="email"
                fullWidth
                margin="normal"
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
              
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Wysyłanie..." : "Potwierdzam zamówienie"}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default ReserveForm;
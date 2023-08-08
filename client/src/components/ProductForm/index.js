import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import InputAdornment from "@mui/material/InputAdornment";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "left",
    margin: "0 auto",
    maxWidth: "660px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "5px",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  },
  textField: {
    margin: theme.spacing(1),
    width: "100%",
  },
  select: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },

  button: {
    textTransform: "none",
    margin: theme.spacing(1),
    width: "100%",
    backgroundColor: "#5048E5",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#512da8",
    },
  },

  label: {
    paddingLeft: "10px",
    color: "#6B7280",
  },
}));

export default function ProductForm({
  onSubmit,
  name,
  description,
  category,
  price,
  quantity,
  link,
  handleNameChange,
  handleDescriptionChange,
  handleCategoryChange,
  handlePriceChange,
  handleStock_quantityChange,
  handleImageChange,
  handleUploadBottonClick,
  imagePreview,
}) {
  const classes = useStyles();
  const { productId } = useParams();

  return (
    <>
      <form className={classes.form} onSubmit={onSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label className={classes.label} for="create-name">
            Product Name
          </label>
          <TextField
            className={classes.textField}
            id="create-name"
            variant="outlined"
            color="secondary"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label className={classes.label} for="create-description">
            Product Description
          </label>
          <TextField
            className={classes.textField}
            id="create-description"
            variant="outlined"
            color="secondary"
            value={description}
            onChange={handleDescriptionChange}
            multiline
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <div style={{ width: "49%" }}>
            <FormControl className={classes.formControl}>
              <label className={classes.label} for="create-category">
                Category
              </label>
              <Select
                className={classes.select}
                labelId="category"
                id="create-category"
                value={category}
                onChange={handleCategoryChange}
                required
              >
                <MenuItem value="costumes">Costumes</MenuItem>
                <MenuItem value="shoes-accessories">
                  Shoes & Accessories
                </MenuItem>
                <MenuItem value="makeup-skincare">Makeup & Skin-care</MenuItem>
                <MenuItem value="snack">Snack & Beverage</MenuItem>
                <MenuItem value="toys">Toys</MenuItem>
                <MenuItem value="jewelry">Jewelry</MenuItem>
                <MenuItem value="furniture">Furniture</MenuItem>
                <MenuItem value="digital-products">Digital Products</MenuItem>
                <MenuItem value="baby-products">Baby Products</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div style={{ width: "49%" }}>
            <label className={classes.label} for="create-price">
              Price
            </label>
            <TextField
              className={classes.textField}
              id="create-price"
              // label="price"
              variant="outlined"
              color="secondary"
              value={price}
              onChange={handlePriceChange}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "35%" }}>
            <label className={classes.label} for="create-stock">
              In Stock Quantity
            </label>
            <TextField
              className={classes.textField}
              id="create-stock"
              variant="outlined"
              color="secondary"
              value={quantity}
              onChange={handleStock_quantityChange}
            />
          </div>
          <div style={{ width: "63%" }}>
            <label className={classes.label} for="create-image">
              Add Image Link
            </label>
            <TextField
              className={classes.textField}
              id="create-image"
              variant="outlined"
              color="secondary"
              value={link}
              onChange={handleImageChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      onClick={handleUploadBottonClick}
                    >
                      Upload
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <div
          className="image-preview"
          style={{
            width: "388px",
            height: "200px",
            backgroundImage: imagePreview
              ? `url("${imagePreview}")`
              : `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='5' ry='5' stroke='%23CCCCCCFF' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
            // backgroundSize: "cover",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            borderRadius: "5px",
            margin: "auto",
            marginTop: "13px",
            marginBottom: "9px",
            display: "flex",
          }}
        >
          {imagePreview ? null : (
            // Show the icon and text only when imagePreview is null
            <div
              style={{
                margin: "auto",
                width: "50%",
                height: "50%",
                textAlign: "center",
              }}
            >
              <UploadFileIcon
                style={{
                  color: "#E5E5E5",
                  "font-size": "45px",
                }}
              ></UploadFileIcon>
              <p style={{ marginTop: "5px", color: "#6B7280" }}>
                Image preview!
              </p>
            </div>
          )}
        </div>
        {productId ? (
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
            style={{ width: "143px" }}
          >
            Update Product
          </Button>
        ) : (
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
            style={{ width: "133px" }}
          >
            Add Product
          </Button>
        )}
      </form>
    </>
  );
}

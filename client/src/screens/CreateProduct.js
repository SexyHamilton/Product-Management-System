import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import axios from "axios";

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

export default function CreateProduct() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [stock_quantity, setStock_quantity] = useState("");
    const [image, setImage] = useState("");

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleStock_quantityChange = (event) => {
        setStock_quantity(event.target.value);
    };

    const handleImageChange = (event) => {
        setImage(event.target.value);

        // need a image preview function
        // ref: https://stackoverflow.com/questions/38049966/get-image-preview-before-uploading-in-react
    };

    // Create product function
    const createProduct = async (product) => {
        try {
            const response = await axios.post(
                "http://localhost:4000/createProduct",
                product
            );
            console.log("Product created:", response.data);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                console.log("Error creating Product:", error.response.data);
                throw error.response.data.Error;
            }
            throw new Error("Cannot create product");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let product = {
            name: name,
            description: description,
            category: category,
            price: price,
            stock_quantity: stock_quantity,
            link: image,
        };

        try {
            await createProduct(product);
            /* use Create product function */
            alert("You have successfully add a product!");
            navigate("/");
        } catch (e) {
            alert(e);
        }
    };

    return (
        <div style={{ maxWidth: "660px", margin: "auto" }}>
            <h1 className="create__title" style={{ position: "left" }}>
                Create Product
            </h1>
            <form className={classes.form} onSubmit={handleSubmit}>
                {/* row 1 */}
                <div style={{ marginBottom: "10px" }}>
                    <label className={classes.label} for="create-name">
                        Product Name
                    </label>
                    <TextField
                        className={classes.textField}
                        id="create-name"
                        // label="name"
                        // placeholder="none"
                        variant="outlined"
                        color="secondary"
                        value={name}
                        onChange={handleNameChange}
                        required
                    />
                </div>
                {/* row 2 */}
                <div style={{ marginBottom: "10px" }}>
                    <label className={classes.label} for="create-description">
                        Product Description
                    </label>
                    <TextField
                        className={classes.textField}
                        id="create-description"
                        // place="description"
                        variant="outlined"
                        color="secondary"
                        value={description}
                        onChange={handleDescriptionChange}
                        multiline
                        rows={4}
                    />
                </div>

                {/* row 3 */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                    }}
                >
                    <div style={{ width: "49%" }}>
                        {/* <label className={classes.label} for="create-category">
              Category
            </label>
            <TextField
              className={classes.textField}
              id="create-category"
              // label="category"
              variant="outlined"
              color="secondary"
              value={category}
              onChange={handleCategoryChange}
              select
            /> */}
                        <FormControl className={classes.formControl}>
                            <label
                                className={classes.label}
                                for="create-category"
                            >
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
                                <MenuItem value="makeup-skincare">
                                    Makeup & Skin-care
                                </MenuItem>
                                <MenuItem value="snack">
                                    Snack & Beverage
                                </MenuItem>
                                <MenuItem value="jewelry">Jewelry</MenuItem>
                                <MenuItem value="furniture">Furniture</MenuItem>
                                <MenuItem value="digital-products">
                                    Digital Products
                                </MenuItem>
                                <MenuItem value="baby-products">
                                    Baby Products
                                </MenuItem>
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
                {/* row 4 */}
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
                            // label="stock_quantity"
                            variant="outlined"
                            color="secondary"
                            value={stock_quantity}
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
                            // label="http://"
                            variant="outlined"
                            color="secondary"
                            value={image}
                            onChange={handleImageChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button
                                            className={classes.button}
                                            variant="contained"
                                            color="primary"
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
                        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='5' ry='5' stroke='%23CCCCCCFF' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
                        borderRadius: "5px",
                        margin: "auto",
                        marginTop: "13px",
                        marginBottom: "9px",
                        display: "flex",
                    }}
                >
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
                </div>

                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ width: "133px" }}
                >
                    Add Product
                </Button>
            </form>
        </div>
    );
}

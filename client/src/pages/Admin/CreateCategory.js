import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd"; // For Modal Creation
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false); // used for modal visiblity
  const [selected, setSelected] = useState(null);
  const [updatedName, SetUpdatedName] = useState("");
  //handle Form

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`, {
          autoClose: 1000,
          position: toast.POSITION.TOP_RIGHT,
        });
        getAllCategory();
      } else {
        toast.error(data.message, {
          autoClose: 1000,
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong", {
        autoClose: 1000,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      // console.log(data);
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      // console.log(error);
      toast.error("Something Went Wrong", {
        autoClose: 1000,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // console.log(e);
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`, {
          autoClose: 1000,
          position: toast.POSITION.TOP_RIGHT,
        });

        setSelected(null);
        SetUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message, {
          autoClose: 1000,
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      // console.log(error);
      toast.error("something went wrong", {
        autoClose: 1000,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  //delete category
  const handleDelete = async (pId) => {
    try {
      // console.log(e);
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`category is deleted`, {
          autoClose: 1000,
          position: toast.POSITION.TOP_RIGHT,
        });
        getAllCategory();
      } else {
        toast.error(data.message, { autoClose: 2500, position: "top right" });
      }
    } catch (error) {
      // console.log(error);
      toast.error("something went wrong", {
        autoClose: 1000,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() => {
                            setVisible(true);
                            SetUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => {
                            handleDelete(c._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={SetUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;

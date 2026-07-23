"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const FooterForm = () => {
  const [footer, setFooter] = useState({
    logo: null,

    quickLinks: [
      {
        title: "",
        url: "",
      },
    ],

    southAfricaOffice: {
      title: "",
      phone: "",
      mobile: "",
      email: "",
      address: "",
    },

    zimbabweOffice: {
      title: "",
      phone: "",
      mobile: "",
      email: "",
      address: "",
    },

    reviewWidget: "",

    copyright: "",

    designerName: "",

    designerLink: "",

    privacyPolicyLink: "",
  });

  const [loading, setLoading] = useState(false);

  const handleQuickLinkChange = (index, field, value) => {
    const links = [...footer.quickLinks];
    links[index][field] = value;

    setFooter({
      ...footer,
      quickLinks: links,
    });
  };

  const addQuickLink = () => {
    setFooter({
      ...footer,
      quickLinks: [
        ...footer.quickLinks,
        {
          title: "",
          url: "",
        },
      ],
    });
  };

  const removeQuickLink = (index) => {
    const links = footer.quickLinks.filter((_, i) => i !== index);

    setFooter({
      ...footer,
      quickLinks: links,
    });
  };

  const API = process.env.NEXT_PUBLIC_API_BASE;

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     try {
  //       const formData = new FormData();

  //       // Only append logo if a new file is selected
  //       if (footer.logo instanceof File) {
  //         formData.append("logo", footer.logo);
  //       }

  //       formData.append("quickLinks", JSON.stringify(footer.quickLinks));
  //       formData.append(
  //         "southAfricaOffice",
  //         JSON.stringify(footer.southAfricaOffice),
  //       );
  //       formData.append("zimbabweOffice", JSON.stringify(footer.zimbabweOffice));
  //       formData.append("reviewWidget", footer.reviewWidget);
  //       formData.append("copyright", footer.copyright);
  //       formData.append("designerName", footer.designerName);
  //       formData.append("designerLink", footer.designerLink);
  //       formData.append("privacyPolicyLink", footer.privacyPolicyLink);

  //       let response;

  //       if (footer._id) {
  //         // Update existing footer
  //         response = await axios.put(
  //           `${API}/api/footer/${footer._id}`,
  //           formData,
  //           {
  //             headers: {
  //               "Content-Type": "multipart/form-data",
  //             },
  //           },
  //         );
  //       } else {
  //         // Create footer
  //         response = await axios.post(`${API}/api/footer`, formData, {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         });
  //       }

  //       toast.success(response.data.message);

  //       // Refresh the form with latest data
  //       fetchFooter();
  //     } catch (error) {
  //       console.error(error);

  //       toast.error(error.response?.data?.message || "Something went wrong");
  //     }
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData();

      if (footer.logo instanceof File) {
        formData.append("logo", footer.logo);
      }

      formData.append("quickLinks", JSON.stringify(footer.quickLinks));
      formData.append(
        "southAfricaOffice",
        JSON.stringify(footer.southAfricaOffice),
      );
      formData.append("zimbabweOffice", JSON.stringify(footer.zimbabweOffice));
      formData.append("reviewWidget", footer.reviewWidget);
      formData.append("copyright", footer.copyright);
      formData.append("designerName", footer.designerName);
      formData.append("designerLink", footer.designerLink);
      formData.append("privacyPolicyLink", footer.privacyPolicyLink);

      let response;

      if (footer._id) {
        response = await axios.put(
          `${API}/api/footer/${footer._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        toast.success("Footer updated successfully");
      } else {
        response = await axios.post(`${API}/api/footer`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Footer created successfully");
      }

      setFooter(response.data.footer);

      fetchFooter();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFooter();
  }, []);

  const fetchFooter = async () => {
    try {
      const { data } = await axios.get(`${API}/api/footer`);

      if (data.success && data.footer) {
        setFooter({
          ...data.footer,
          logo: data.footer.logo || null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-7xl mx-auto space-y-8">
      {/* Logo */}

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-5">Footer Logo</h2>
        {footer.logo && typeof footer.logo === "string" && (
          <img
            src={footer.logo}
            alt="Footer Logo"
            className="w-40 h-auto mb-4 rounded"
          />
        )}
        <input
          type="file"
          onChange={(e) =>
            setFooter({
              ...footer,
              logo: e.target.files[0],
            })
          }
        />
      </div>

      {/* Quick Links */}

      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">Quick Links</h2>

          <button
            type="button"
            onClick={addQuickLink}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Link
          </button>
        </div>

        {footer.quickLinks.map((item, index) => (
          <div key={index} className="grid md:grid-cols-3 gap-4 mb-4">
            <input
              className="border p-3 rounded"
              placeholder="Title"
              value={item.title}
              onChange={(e) =>
                handleQuickLinkChange(index, "title", e.target.value)
              }
            />

            <input
              className="border p-3 rounded"
              placeholder="/about-us"
              value={item.url}
              onChange={(e) =>
                handleQuickLinkChange(index, "url", e.target.value)
              }
            />

            <button
              type="button"
              onClick={() => removeQuickLink(index)}
              className="bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* South Africa */}

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-5">South Africa Office</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="border p-3 rounded"
            placeholder="Office Title"
            value={footer.southAfricaOffice.title}
            onChange={(e) =>
              setFooter({
                ...footer,
                southAfricaOffice: {
                  ...footer.southAfricaOffice,
                  title: e.target.value,
                },
              })
            }
          />

          <input
            className="border p-3 rounded"
            placeholder="Phone"
            value={footer.southAfricaOffice.phone}
            onChange={(e) =>
              setFooter({
                ...footer,
                southAfricaOffice: {
                  ...footer.southAfricaOffice,
                  phone: e.target.value,
                },
              })
            }
          />

          <input
            className="border p-3 rounded"
            placeholder="Mobile"
            value={footer.southAfricaOffice.mobile}
            onChange={(e) =>
              setFooter({
                ...footer,
                southAfricaOffice: {
                  ...footer.southAfricaOffice,
                  mobile: e.target.value,
                },
              })
            }
          />

          <input
            className="border p-3 rounded"
            placeholder="Email"
            value={footer.southAfricaOffice.email}
            onChange={(e) =>
              setFooter({
                ...footer,
                southAfricaOffice: {
                  ...footer.southAfricaOffice,
                  email: e.target.value,
                },
              })
            }
          />

          <textarea
            rows={4}
            className="border p-3 rounded md:col-span-2"
            placeholder="Address"
            value={footer.southAfricaOffice.address}
            onChange={(e) =>
              setFooter({
                ...footer,
                southAfricaOffice: {
                  ...footer.southAfricaOffice,
                  address: e.target.value,
                },
              })
            }
          />
        </div>
      </div>

      {/* Zimbabwe */}

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-5">Zimbabwe Office</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="border p-3 rounded"
            placeholder="Office Title"
            value={footer.zimbabweOffice?.title || ""}
            onChange={(e) =>
              setFooter({
                ...footer,
                zimbabweOffice: {
                  ...footer.zimbabweOffice,
                  title: e.target.value,
                },
              })
            }
          />

          <input
            className="border p-3 rounded"
            placeholder="Phone"
            value={footer.zimbabweOffice.phone}
            onChange={(e) =>
              setFooter({
                ...footer,
                zimbabweOffice: {
                  ...footer.zimbabweOffice,
                  phone: e.target.value,
                },
              })
            }
          />

          <input
            className="border p-3 rounded"
            placeholder="Mobile"
            value={footer.zimbabweOffice.mobile}
            onChange={(e) =>
              setFooter({
                ...footer,
                zimbabweOffice: {
                  ...footer.zimbabweOffice,
                  mobile: e.target.value,
                },
              })
            }
          />

          <input
            className="border p-3 rounded"
            placeholder="Email"
            value={footer.zimbabweOffice.email}
            onChange={(e) =>
              setFooter({
                ...footer,
                zimbabweOffice: {
                  ...footer.zimbabweOffice,
                  email: e.target.value,
                },
              })
            }
          />

          <textarea
            rows={4}
            className="border p-3 rounded md:col-span-2"
            placeholder="Address"
            value={footer.zimbabweOffice.address}
            onChange={(e) =>
              setFooter({
                ...footer,
                zimbabweOffice: {
                  ...footer.zimbabweOffice,
                  address: e.target.value,
                },
              })
            }
          />
        </div>
      </div>

      {/* Review */}

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-5">Review Widget</h2>

        <textarea
          rows={4}
          className="border w-full p-3 rounded"
          placeholder="Iframe URL"
          value={footer.reviewWidget || ""}
          onChange={(e) =>
            setFooter({
              ...footer,
              reviewWidget: e.target.value,
            })
          }
        />
      </div>

      {/* Footer Bottom */}

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-5">Footer Bottom</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="border p-3 rounded"
            placeholder="Copyright"
            value={footer.copyright || ""}
            onChange={(e) =>
              setFooter({
                ...footer,
                copyright: e.target.value,
              })
            }
          />

          <input
            className="border p-3 rounded"
            placeholder="Designer Name"
            value={footer.designerName || ""}
            onChange={(e) =>
              setFooter({
                ...footer,
                designerName: e.target.value,
              })
            }
          />

          <input
            className="border p-3 rounded"
            placeholder="Designer Link"
            value={footer.designerLink || ""}
            onChange={(e) =>
              setFooter({
                ...footer,
                designerLink: e.target.value,
              })
            }
          />
          <input
            className="border p-3 rounded"
            placeholder="Privacy Policy Link"
            value={footer.privacyPolicyLink || ""}
            onChange={(e) =>
              setFooter({
                ...footer,
                privacyPolicyLink: e.target.value,
              })
            }
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`px-8 py-3 rounded-lg text-white transition-all ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading
          ? footer._id
            ? "Updating..."
            : "Saving..."
          : footer._id
            ? "Update Footer"
            : "Create Footer"}
      </button>
    </form>
  );
};

export default FooterForm;

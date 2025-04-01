"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

const TowerDetailForm = ({ onTowerTypeChange }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  // Tower Form
  const {
    register: registerTower,
    handleSubmit: handleTowerSubmit,
    formState: { errors: towerErrors },
  } = useForm();

  // Mount Form
  const {
    register: registerMount,
    handleSubmit: handleMountSubmit,
    watch,
    formState: { errors: mountErrors },
  } = useForm();

  const mountTypeFields = {
    Platform: ["Subtype", "No of Handrails", "Handrail Spacing", "Face Width", "Height", "Kicker", "Mount Azimuth"],
    "Sector Mount": ["Boom Type", "No of Handrails", "Handrail Spacing", "Face Width", "Height", "Standoff", "Mount Azimuth", "Face A", "Face B", "Face C"],
    "3 Sector": ["Boom Type", "No of Handrails", "Handrail Spacing", "Face Width", "Height", "Standoff", "Mount Azimuth", "Face A", "Face B", "Face C"],
    TArm: ["Handrail Spacing", "Face Width", "Standoff", "Face Rotation", "Mount Azimuth", "Face A", "Face B", "Face C"],
    "3TArm": ["Handrail Spacing", "Face Width", "Standoff", "Face Rotation", "Mount Azimuth", "Face A", "Face B", "Face C"],
  };

  const selectedMountType = watch("mountType");
  const enabledFields = mountTypeFields[selectedMountType] || [];

  const onTowerSubmit = (data) => {
    console.log("Tower Data:", data);
  };

  const onMountSubmit = (data) => {
    console.log("Mount Data:", data);
    if (onTowerTypeChange) {
      onTowerTypeChange(data);
    }
  };

  return (
    <div className="container min-vh-100 mt-4">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4 text-dark fw-bold">Create Tower & Mount</h2>

        {/* Tower Details Form */}
        <form onSubmit={handleTowerSubmit(onTowerSubmit)} className="mt-3 p-3 border rounded">
          <span className="badge bg-primary fs-5 mb-3 px-3 py-2 rounded">Tower Details</span>
          <div className="row">
            <div className="col-md-3 mb-3">
              <label htmlFor="towerType" className="form-label fw-bold">Tower Type</label>
              <select
                id="towerType"
                {...registerTower("towerType", { required: "*Tower Type is required" })}
                className={`form-select ${towerErrors.towerType ? "is-invalid" : ""}`}
              >
                <option value="">Select Tower Type</option>
                <option value="Monopole">Monopole</option>
                <option value="3-Sided">3-Sided</option>
                <option value="4-Sided">4-Sided</option>
              </select>
              {towerErrors.towerType && <div className="invalid-feedback">{towerErrors.towerType?.message}</div>}
            </div>

            <div className="col-md-3 mb-3">
              <label htmlFor="width" className="form-label fw-bold">Width (in inches)</label>
              <input
                type="number"
                id="width"
                {...registerTower("width", { required: "*Width is required", min: { value: 0.1, message: "*Width must be greater than 0" } })}
                className={`form-control ${towerErrors.width ? "is-invalid" : ""}`}
              />
              {towerErrors.width && <div className="invalid-feedback">{towerErrors.width?.message}</div>}
            </div>

            <div className="col-md-3 mb-3">
              <label htmlFor="collarDepth" className="form-label fw-bold">Collar Depth (in inches)</label>
              <input
                type="number"
                id="collarDepth"
                {...registerTower("collarDepth", { required: "*Collar Depth is required", min: { value: 0.1, message: "*Collar Depth must be greater than 0" } })}
                className={`form-control ${towerErrors.collarDepth ? "is-invalid" : ""}`}
              />
              {towerErrors.collarDepth && <div className="invalid-feedback">{towerErrors.collarDepth?.message}</div>}
            </div>

            <div className="col-md-3 mb-3">
              <label htmlFor="collarHeight" className="form-label fw-bold">Collar Height (in inches)</label>
              <input
                type="number"
                id="collarHeight"
                {...registerTower("collarHeight", { required: "*Collar Height is required", min: { value: 0.1, message: "*Collar Height must be greater than 0" } })}
                className={`form-control ${towerErrors.collarHeight ? "is-invalid" : ""}`}
              />
              {towerErrors.collarHeight && <div className="invalid-feedback">{towerErrors.collarHeight?.message}</div>}
            </div>
          </div>

          {/* Tower Details Submit Button (Same Style as Mount Details) */}
          <button type="submit" className="btn btn-success w-100 mt-3">Submit Tower Details</button>
        </form>

        {/* Mount Details Form */}
        <form onSubmit={handleMountSubmit(onMountSubmit)} className="mt-4 p-3 border rounded">
          <span className="badge bg-info fs-5 mb-3 px-3 py-2 rounded">Mount Details</span>
          <div className="mb-3">
            <label htmlFor="mountType" className="form-label fw-bold">Mount Type</label>
            <select
              id="mountType"
              {...registerMount("mountType", { required: "*Mount Type is required" })}
              className={`form-select ${mountErrors.mountType ? "is-invalid" : ""}`}
            >
              <option value="">Select Mount Type</option>
              {Object.keys(mountTypeFields).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {mountErrors.mountType && <div className="invalid-feedback">{mountErrors.mountType?.message}</div>}
          </div>

          {/* Dynamic Fields Based on Mount Type */}
          <div className="row">
            {enabledFields.map((field) => (
              <div key={field} className="col-md-4 mb-3">
                <label htmlFor={field} className="form-label fw-bold">{field}</label>
                <input
                  type="text"
                  id={field}
                  {...registerMount(field, { required: `${field} is required` })}
                  className={`form-control ${mountErrors[field] ? "is-invalid" : ""}`}
                />
                {mountErrors[field] && <div className="invalid-feedback">{mountErrors[field]?.message}</div>}
              </div>
            ))}
          </div>

          {/* Mount Details Submit Button */}
          <button type="submit" className="btn btn-success w-100 mt-3">Submit Mount Details</button>
        </form>
      </div>
    </div>
  );
};

export default TowerDetailForm;

import React from "react";

const EditEventModal = ({ isOpen, onClose, formData, setFormData, onUpdate, minDate }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-lg relative">
        <h3 className="font-bold text-lg mb-2">Edit Event</h3>
        <div className="space-y-2">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="input input-bordered w-full"
            value={formData.title}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            className="textarea textarea-bordered w-full resize-none"
            value={formData.description}
            onChange={handleChange}
          />
          <select
            name="eventType"
            className="select select-bordered w-full"
            value={formData.eventType}
            onChange={handleChange}
          >
            <option>Cleanup</option>
            <option>Plantation</option>
            <option>Donation</option>
            <option>Other</option>
          </select>
          <input
            type="url"
            name="thumbnailUrl"
            placeholder="Thumbnail URL"
            className="input input-bordered w-full"
            value={formData.thumbnailUrl}
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="input input-bordered w-full"
            value={formData.location}
            onChange={handleChange}
          />
          <input
            type="datetime-local"
            name="eventDate"
            className="input input-bordered w-full"
            value={formData.eventDate}
            onChange={handleChange}
            min={minDate}
          />
        </div>
        <div className="modal-action flex justify-end gap-2 mt-2">
          <button className="btn btn-primary" onClick={()=> onUpdate(formData)}>Update</button>
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditEventModal;

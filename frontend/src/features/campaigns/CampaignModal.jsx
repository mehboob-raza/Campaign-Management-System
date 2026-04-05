import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const CampaignModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({ name: '', budget: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl mb-4">Create Campaign</h2>
        <form onSubmit={handleSubmit}>
          <Input
            name="name"
            placeholder="Campaign Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            name="budget"
            placeholder="Budget"
            type="number"
            value={formData.budget}
            onChange={handleChange}
            required
          />
          <div className="flex justify-end mt-4">
            <Button type="button" onClick={onClose} variant="secondary">
              Cancel
            </Button>
            <Button type="submit" className="ml-2">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CampaignModal;
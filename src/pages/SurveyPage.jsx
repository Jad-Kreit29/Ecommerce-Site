import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import OrderConfirmationModal from '../components/OrderConfirmationModal'

const SurveyPage = () => {
  const navigate = useNavigate();
  const [satisfaction, setSatisfaction] = useState('');
  const [howHeard, setHowHeard] = useState('');
  const [nextAnimal, setNextAnimal] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // New state for modal visibility

  const handleSubmitSurvey = (e) => {
    e.preventDefault();
    console.log('Survey Submitted:', {
      satisfaction,
      howHeard,
      nextAnimal,
      feedback
    });
    // Open the custom modal instead of using alert
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
    navigate('/'); // Redirect to home page after modal is closed
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-orange-900 mb-8">Tell Us About Your Experience!</h1>

      <Card className="p-6 shadow-lg rounded-lg max-w-2xl mx-auto">
        <CardHeader className="mb-6">
          <CardTitle className="text-2xl font-semibold text-orange-800">Quick Survey</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitSurvey} className="space-y-6">

            {/* New: How did you hear about us? */}
            <div>
              <label htmlFor="howHeard" className="block text-lg font-medium text-gray-700 mb-2">
                How did you hear about ChocoZoo?
              </label>
              <select
                id="howHeard"
                value={howHeard}
                onChange={(e) => setHowHeard(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 text-gray-800"
                required
              >
                <option value="">Select an option</option>
                <option value="social-media">Social Media</option>
                <option value="search-engine">Search Engine (Google, Bing, etc.)</option>
                <option value="friend-family">Friend/Family Recommendation</option>
                <option value="advertisement">Advertisement</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* New: What animal would you like to see next? */}
            <div>
              <label htmlFor="nextAnimal" className="block text-lg font-medium text-gray-700 mb-2">
                What chocolate animal would you like to see us create next?
              </label>
              <input
                type="text"
                id="nextAnimal"
                value={nextAnimal}
                onChange={(e) => setNextAnimal(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 text-gray-800"
                placeholder="e.g., Panda, Penguin, T-Rex"
              />
            </div>

            {/* Existing: Additional feedback */}
            <div>
              <label htmlFor="feedback" className="block text-lg font-medium text-gray-700 mb-2">
                Any additional feedback or suggestions?
              </label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows="5"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500 text-gray-800"
                placeholder="Share your thoughts..."
              ></textarea>
            </div>

            <CardFooter className="pt-0">
              <Button type="submit" className="w-full bg-amber-700 hover:bg-amber-800 text-white text-lg px-8 py-3 rounded-md">
                Submit Survey
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>

      {/* Render the custom confirmation modal for survey feedback */}
      <OrderConfirmationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        message="Thank you for your feedback!"
      />
    </div>
  );
};

export default SurveyPage;

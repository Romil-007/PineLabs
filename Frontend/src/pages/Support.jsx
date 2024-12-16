import { useState } from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

function Support() {
  const [activeTab, setActiveTab] = useState('faq')
  const [searchQuery, setSearchQuery] = useState('')

  const faqs = [
    {
      question: 'How do I add a new POS device?',
      answer:
        'To add a new POS device, go to the POS Management page and click on "Add New Device". Follow the setup wizard to configure your device.',
    },
    {
      question: 'How can I generate reports?',
      answer:
        'Navigate to the Reports page, select the type of report you want to generate, set the date range, and click on "Generate Report".',
    },
    {
      question: 'What payment methods are supported?',
      answer:
        'We support various payment methods including credit/debit cards, UPI, net banking, and mobile wallets.',
    },
  ]

  const tabs = [
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact Support' },
    { id: 'tickets', label: 'My Tickets' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
      </div>

      <div className="flex space-x-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`pb-4 px-4 text-sm font-medium ${
              activeTab === tab.id
                ? 'border-b-2 border-primary-600 text-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'faq' && (
        <>
          <Card>
            <Input
              type="search"
              placeholder="Search FAQ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md mb-6"
            />

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b pb-6 last:border-b-0">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      {activeTab === 'contact' && (
        <Card>
          <form className="space-y-6">
            <Input label="Subject" placeholder="How can we help you?" />
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="input"
                placeholder="Describe your issue..."
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Send Message</Button>
            </div>
          </form>
        </Card>
      )}

      {activeTab === 'tickets' && (
        <Card>
          <div className="space-y-4">
            {[1, 2, 3].map((ticket) => (
              <div
                key={ticket}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">Ticket #{ticket}</p>
                  <p className="text-sm text-gray-600">
                    Opened on March {ticket + 9}, 2024
                  </p>
                </div>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  In Progress
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

export default Support
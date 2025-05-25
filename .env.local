'use client'

import React, { useState, useEffect } from 'react';
import {
  Copy, RefreshCw, Trash, Mail, Clock, Download, User,
  LogOut, Plus, Crown, Settings, Shield, Zap, CheckCircle,
  AlertCircle, ExternalLink, Database, Globe2, ChevronDown
} from 'lucide-react';

// Mock contexts for demo - will be replaced with real ones
const useAuth = () => ({
  user: { email: 'demo@example.com' },
  profile: {
    subscription_plan: 'business',
    subscription_status: 'active',
    email_count: 2,
    max_simultaneous_emails: 10,
    storage_limit: 1073741824,
    custom_domain: 'mycompany.com'
  },
  isSubscribed: true,
  isPro: true,
  isBusiness: true,
  canCreateEmail: true,
  signOut: () => {},
  loading: false
});

const useEmail = () => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [tempEmails, setTempEmails] = useState([
    {
      id: '1',
      email_address: 'sales@mycompany.com',
      expires_at: new Date(Date.now() + 6 * 24 * 60 * 60000).toISOString(),
      is_active: true,
      created_at: new Date().toISOString(),
      domain: 'mycompany.com',
      type: 'custom'
    },
    {
      id: '2',
      email_address: 'demo123@promail.co',
      expires_at: new Date(Date.now() + 20 * 60 * 60000).toISOString(),
      is_active: true,
      created_at: new Date().toISOString(),
      domain: 'promail.co',
      type: 'premium'
    }
  ]);

  const [currentEmail, setCurrentEmail] = useState(tempEmails[0]);
  const selectEmail = setCurrentEmail;
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return {
    tempEmails, currentEmail,
    messages: [],
    loading, refreshing, generateEmail: () => {}, refreshMessages: () => {}, getTimeRemaining: () => {},
    copyEmailAddress: () => {}, selectEmail, formatFileSize
  };
};

const usePayment = () => ({
  createCheckoutSession: async (priceId, plan) => {
    try {
      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: priceId,
          plan: plan,
        }),
      });

      const session = await response.json();

      if (session.url) {
        // Redirect to Stripe checkout
        window.location.href = session.url;
      } else {
        alert('Error creating checkout session');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating checkout session');
    }
  },
  loading: false
});

export default function TempEmailApp() {
  const auth = useAuth();
  const email = useEmail();
  const payment = usePayment();

  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-black shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-black" />
              </div>
              <h1 className="text-xl font-bold text-white">TempEmail Pro</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {auth.user && (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowUpgrade(true)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                  >
                    <Crown className="w-4 h-4" />
                    <span>Upgrade</span>
                  </button>
                  <button
                    onClick={() => setShowSettings(true)}
                    className="p-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                  <button
                    onClick={auth.signOut}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Email Management Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Your Emails</h2>
                  <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4" />
                    <span>New</span>
                  </button>
                </div>
                
                {email.currentEmail && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex-1">
                        <p className="font-medium text-blue-900 truncate">{email.currentEmail.email_address}</p>
                        <p className="text-sm text-blue-600">Active • Custom Domain</p>
                      </div>
                      <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {email.tempEmails.map((tempEmail) => (
                    <div
                      key={tempEmail.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        email.currentEmail?.id === tempEmail.id
                          ? 'bg-blue-50 border-blue-200'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                      onClick={() => email.selectEmail(tempEmail)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 truncate">{tempEmail.email_address}</p>
                          <p className="text-sm text-gray-600">{tempEmail.type}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Messages Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                      <RefreshCw className="w-4 h-4" />
                      <span>Refresh</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="text-center py-12">
                  <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
                  <p className="text-gray-600">Messages sent to your temporary email will appear here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgrade && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Plan</h2>
                <p className="text-gray-600">Upgrade for unlimited temporary emails and premium features</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {/* Free Plan */}
                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Free</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900">$0</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">3 emails per day</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">2-hour email lifetime</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Basic support</span>
                    </li>
                  </ul>
                  <button className="w-full py-3 px-4 bg-gray-100 text-gray-800 rounded-lg font-medium">
                    Current Plan
                  </button>
                </div>

                {/* Pro Plan */}
                <div className="border-2 border-purple-500 rounded-xl p-6 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Pro</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900">$9.99</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Unlimited emails</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">7-day email lifetime</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Priority support</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">No ads</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Email forwarding</span>
                    </li>
                  </ul>
                  <button 
                    onClick={() => payment.createCheckoutSession('prod_SNB4mRo3zktMUp', 'Pro')}
                    className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    Upgrade to Pro
                  </button>
                </div>

                {/* Business Plan */}
                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Business</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900">$29.99</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Everything in Pro</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Custom domains</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">API access</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Team management</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Advanced analytics</span>
                    </li>
                  </ul>
                  <button 
                    onClick={() => payment.createCheckoutSession('prod_SMB7zrc8sK94xv', 'Business')}
                    className="w-full py-3 px-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    Upgrade to Business
                  </button>
                </div>
              </div>
              
              <div className="text-center">
                <button
                  onClick={() => setShowUpgrade(false)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
                <button 
                  onClick={() => setShowSettings(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        value={auth.user?.email || ''} 
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Plan</label>
                      <input 
                        type="text" 
                        value={auth.profile?.subscription_plan || 'Free'} 
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 capitalize"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{auth.profile?.email_count || 0}</div>
                      <div className="text-sm text-gray-600">Active Emails</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{auth.profile?.max_simultaneous_emails || 3}</div>
                      <div className="text-sm text-gray-600">Max Emails</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowSettings(false)}
                  className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

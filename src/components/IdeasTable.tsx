'use client'
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Badges } from "@/components/ui/badges";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Badge } from "@/components/Badge";
import { motion } from 'framer-motion';

const IdeasTable = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  // Fetch data from Airtable
  useEffect(() => {
    // In your IdeasTable component, update the fetch call:

const fetchIdeas = async () => {
  try {
    const response = await fetch('/api/ideas');
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.details || data.error || 'Failed to fetch ideas');
    }
    
    setIdeas(data);
    setLoading(false);
  } catch (err) {
    console.error('Error details:', err);
    setError(err.message);
    setLoading(false);
  }
};

    fetchIdeas();
  }, []);

  // Compute categories dynamically from ideas data
  const categories = [
    { id: 'all', name: 'All', count: ideas.length },
    ...Array.from(new Set(ideas.map(idea => idea.category)))
      .map(category => ({
        id: category,
        name: category,
        count: ideas.filter(idea => idea.category === category).length
      }))
  ];

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-24 relative z-[3]">
      <div className="flex flex-col gap-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20 pt-14"
        >
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-8">
            Ideas
          </h1>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            Browse through curated ideas from the community and start building
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Left Panel - Categories */}
          <div className="w-64 flex-shrink-0 backdrop-blur-sm rounded-lg border border-white/[0.2]">
            <Card className="bg-black/40 p-4">
              <h3 className="text-white font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.name)}
                    className={`w-full flex justify-between items-center px-3 py-2 rounded-md transition-colors ${
                      activeCategory === category.name
                        ? 'bg-green-500/20 text-green-400'
                        : 'text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="text-sm">{category.count}</span>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Side - Table */}
          <Card className="flex-1 bg-black/40">
            <div className="overflow-x-auto backdrop-blur-sm rounded-lg border border-white/[0.2]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="p-4 text-left text-gray-400 font-medium">Project</th>
                    <th className="p-4 text-left text-gray-400 font-medium">Description</th>
                    <th className="p-4 text-left text-gray-400 font-medium">Difficulty</th>
                    <th className="p-4 text-left text-gray-400 font-medium">Timeframe</th>
                    <th className="p-4 text-left text-gray-400 font-medium">Prize</th>
                    <th className="p-4 text-left text-gray-400 font-medium">Status</th>
                    
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {ideas
                    .filter(idea => activeCategory === 'All' || idea.category === activeCategory)
                    .map((idea, index) => (
                      <tr 
                        key={index}
                        className="group hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <td className="p-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-white group-hover:text-green-400 transition-colors">
                                {idea.title}
                              </span>
                              <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-green-400" />
                            </div>
                            
                            <div className="flex gap-2 mt-2">
                              {idea.tags.map((tag, idx) => (
                                <Badges
                                  key={idx}
                                  variant="secondary"
                                  className="bg-white/5 text-gray-300 hover:bg-white/10"
                                >
                                  {tag}
                                </Badges>
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-green-400 font-medium">{idea.description}</td>
                        <td className="p-4 text-gray-400">
                          <Badges variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                            {idea.difficulty} 
                          </Badges>
                        </td>
                        <td className="p-4 text-gray-400">{idea.timeframe}</td>
                        <td className="p-4 text-green-400 font-medium">{idea.prize}</td>
                        <td className="p-4">
                          <Badges variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                            {idea.status}
                          </Badges>
                        </td>
                        <td className="p-4">
                          {/* <div className="flex items-center gap-2 text-gray-400">
                            <MessageCircle className="w-4 h-4" />
                            <span>{idea.comments}</span>
                          </div> */}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        
        {/* Submit Button */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center">
            <Badge text="Submit your idea" href="https://airtable.com/appTd1vV948UZjHYw/shraeV6riyOBo0Az9" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeasTable;
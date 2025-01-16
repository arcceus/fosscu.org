"use client"
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badges } from "@/components/ui/badges";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Badge } from "@/components/Badge";
import { motion } from 'framer-motion';


const IdeasTable = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { id: 'all', name: 'All', count: 3 },
    { id: 'defi', name: 'DeFi', count: 2 },
    { id: 'nft', name: 'NFTs', count: 1 },
    { id: 'dao', name: 'DAO', count: 1 },
    { id: 'infrastructure', name: 'Infrastructure', count: 1 }
  ];

  const ideas = [
    {
      title: "SVM Trade Copier",
      description: "Build a trade copier for SVM that allows users to copy-trade winning strategies from SVM's on-chain orderbook",
      difficulty: "Medium",
      timeframe: "4-6 weeks",
      comments: 0,
      tags: ["Solana", "Trading", "DeFi"],
      prize: "$2000",
      status: "Active",
      category: "DeFi"
    },
    {
      title: "Compressed NFT Bridge",
      description: "Build a bridge for compressed NFTs between Solana and other chains",
      difficulty: "Hard",
      timeframe: "8-12 weeks",
      comments: 0,
      tags: ["NFTs", "Bridge", "cNFT"],
      prize: "$5000",
      status: "Active",
      category: "NFTs"
    },
    {
      title: "Decentralized Grants Platform",
      description: "Create a grants platform where users can create, fund and manage grant programs in a decentralized way",
      difficulty: "Medium",
      timeframe: "6-8 weeks", 
      comments: 0,
      tags: ["DAO", "Grants", "DeFi"],
      prize: "$3000",
      status: "Active",
      category: "DAO"
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-24 relative z-[3]">
      <div className="flex flex-col gap-12">
        {/* Header */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
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
                    <th className="p-4 text-left text-gray-400 font-medium">Difficulty</th>
                    <th className="p-4 text-left text-gray-400 font-medium">Timeframe</th>
                    <th className="p-4 text-left text-gray-400 font-medium">Prize</th>
                    <th className="p-4 text-left text-gray-400 font-medium">Status</th>
                    <th className="p-4 text-left text-gray-400 font-medium">Comments</th>
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
                          <p className="text-sm text-gray-400">{idea.description}</p>
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
                      <td className="p-4 text-gray-400">{idea.difficulty}</td>
                      <td className="p-4 text-gray-400">{idea.timeframe}</td>
                      <td className="p-4 text-green-400 font-medium">{idea.prize}</td>
                      <td className="p-4">
                        <Badges variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                          {idea.status}
                        </Badges>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-gray-400">
                          <MessageCircle className="w-4 h-4" />
                          <span>{idea.comments}</span>
                        </div>
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
                        <Badge text="Submit your idea" href="https://goolge.com" />
                      </div>
            </div>
      </div>
    </div>
  );
};

export default IdeasTable;
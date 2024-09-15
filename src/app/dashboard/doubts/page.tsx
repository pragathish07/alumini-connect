"use client"

import React, { useState } from 'react';
import { FaArrowUp, FaComment } from 'react-icons/fa';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Question = {
  id: number;
  title: string;
  content: string;
  author: string;
  upvotes: number;
  comments: Comment[];
};

type Comment = {
  id: number;
  content: string;
  author: string;
};

const staticQuestions: Question[] = [
  {
    id: 1,
    title: "How to prepare for a technical interview?",
    content: "I have an upcoming technical interview for a software engineering position. Any tips on how to prepare effectively?",
    author: "CuriousStudent",
    upvotes: 15,
    comments: [
      { id: 1, content: "Practice coding problems on platforms like LeetCode or HackerRank.", author: "ExperiencedDev" },
      { id: 2, content: "Review fundamental data structures and algorithms.", author: "TechInterviewer" }
    ]
  },
  {
    id: 2,
    title: "Best resources for learning React?",
    content: "I'm looking to learn React for web development. What are some recommended resources or courses?",
    author: "WebDevNewbie",
    upvotes: 10,
    comments: [
      { id: 3, content: "The official React documentation is a great place to start.", author: "ReactEnthusiast" },
      { id: 4, content: "I recommend the 'React - The Complete Guide' course on Udemy.", author: "CourseAdvisor" }
    ]
  }
];

export default function DoubtsPage() {
  const [questions, setQuestions] = useState(staticQuestions);
  const [newQuestion, setNewQuestion] = useState({ title: '', content: '' });
  const [newComment, setNewComment] = useState('');
  const [activeCommentId, setActiveCommentId] = useState<number | null>(null);

  const handleVote = (questionId: number) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, upvotes: q.upvotes + 1 } : q
    ));
  };

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    const newQuestionObj: Question = {
      id: questions.length + 1,
      ...newQuestion,
      author: "CurrentUser",
      upvotes: 0,
      comments: []
    };
    setQuestions([newQuestionObj, ...questions]);
    setNewQuestion({ title: '', content: '' });
  };

  const handleSubmitComment = (questionId: number) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          comments: [...q.comments, { id: q.comments.length + 1, content: newComment, author: "CurrentUser" }]
        };
      }
      return q;
    }));
    setNewComment('');
    setActiveCommentId(null);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white p-6">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Doubt Clarification Forum</h1>
        
        <form onSubmit={handleSubmitQuestion} className="mb-8 bg-blue-900 bg-opacity-30 backdrop-filter backdrop-blur-lg p-4 rounded-lg">
          <Input
            placeholder="Question Title"
            value={newQuestion.title}
            onChange={(e) => setNewQuestion({...newQuestion, title: e.target.value})}
            className="mb-2 bg-blue-800 bg-opacity-50 text-white placeholder-blue-300 border-blue-700"
          />
          <Textarea
            placeholder="Question Content"
            value={newQuestion.content}
            onChange={(e) => setNewQuestion({...newQuestion, content: e.target.value})}
            className="mb-2 bg-blue-800 bg-opacity-50 text-white placeholder-blue-300 border-blue-700"
          />
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
            Submit Question
          </Button>
        </form>

        <div className="space-y-4">
          {questions.map(question => (
            <div key={question.id} className="bg-blue-900 bg-opacity-30 backdrop-filter backdrop-blur-lg p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">{question.title}</h2>
              <p className="mb-2">{question.content}</p>
              <p className="text-sm text-blue-300 mb-2">Asked by: {question.author}</p>
              <div className="flex items-center space-x-4 mb-2">
                <button onClick={() => handleVote(question.id)} className="flex items-center">
                  <FaArrowUp className="mr-1" /> {question.upvotes}
                </button>
                <button onClick={() => setActiveCommentId(activeCommentId === question.id ? null : question.id)} className="flex items-center">
                  <FaComment className="mr-1" /> {question.comments.length}
                </button>
              </div>
              {activeCommentId === question.id && (
                <div className="mt-2">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mb-2 bg-blue-800 bg-opacity-50 text-white placeholder-blue-300 border-blue-700"
                  />
                  <Button onClick={() => handleSubmitComment(question.id)} className="bg-blue-600 hover:bg-blue-700 text-white">
                    Submit Comment
                  </Button>
                </div>
              )}
              <div className="pl-4 border-l-2 border-blue-700 mt-4">
                {question.comments.map(comment => (
                  <div key={comment.id} className="mb-2">
                    <p>{comment.content}</p>
                    <p className="text-sm text-blue-300">Answered by: {comment.author}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
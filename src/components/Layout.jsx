import React from 'react';
import FileUpload from './FileUpload';
import MongoDisplay from './MongoDisplay';
import ChatComponent from './ChatComponent';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-grow p-4">
        <div className="flex flex-col mr-4 space-y-6">
          <FileUpload />
          <MongoDisplay />
        </div>
        <ChatComponent />
      </main>
    </div>
  );
};

export default Layout;

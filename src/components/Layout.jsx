import React from 'react';
import FileUpload from './FileUpload';
import MongoDisplay from './MongoDisplay';
import ChatComponent from './ChatComponent';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-grow p-4">
        <div className="flex flex-col mr-4 space-y-6">
          <div style={{ width: '180%' }}> {/* Fixed width */}
            <FileUpload />
          </div>
          <div style={{ width: '180%' }}> {/* Fixed width */}
            <MongoDisplay />
          </div>
        </div>
        <div style={{ width: '100%' }}> {/* Fixed width */}
          <ChatComponent />
        </div>
      </main>
    </div>
  );
};

export default Layout;

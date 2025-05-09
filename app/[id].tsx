import React from 'react';

interface SlideProps {
  params: { id: string };
}

const Slide: React.FC<SlideProps> = ({ params }) => {
  const { id } = params;

  return (
    <div>
      <h1>Slide ID: {id}</h1>
      <p>This is a placeholder for the slide content.</p>
    </div>
  );
};

export default Slide;

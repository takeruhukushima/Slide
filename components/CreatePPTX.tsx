import React from 'react';
import PPTXGenJS from 'pptxgenjs';

const CreatePPTX = () => {
  const generatePPTX = () => {
    let pptx = new PPTXGenJS();
    
    // 新しいスライドを作成
    let slide = pptx.addSlide();
    slide.addText('Hello World!', { x: 1, y: 1, fontSize: 18 });

    // PPTXファイルを保存
    pptx.writeFile({ fileName: 'example.pptx' });
  };

  return (
    <div>
      <button onClick={generatePPTX}>Create PPTX</button>
    </div>
  );
};

export default CreatePPTX;

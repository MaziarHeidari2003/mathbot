import React, { useState } from 'react';
import config from '../utils/config';
import IsAuthenticated from "../utils/IsAuthenticated";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function UploadComment(props) {

    const post = props.postId

    const [formData, setFormData] = useState({
      content: "",
      post_id: post,
    });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    // Function to submit the form data using Axios
    const handleSubmit = async (e) => {
      e.preventDefault();

      const TokenConfig = config();

      try {
        const response = await TokenConfig.post("/comments/create/", formData);
        console.log("Post created:", response.data);
        alert("پاسخ با موفقیت آپلود شد");
        window.location.reload();
      } catch (error) {
        console.error("Error creating post:", error.response.data);
        alert("پاسخ آپلود نشد! یه مشکلی وجود داره")
      }
    };

    if (IsAuthenticated() === "Not Authenticated") {
      return (
        <>
          <p>جهت ثبت پاسخ ابتدا <Link to="/login">وارد شوید</Link></p>
        </>
      )
    } else {
      return (
        <div className="your-answer-box">
            <form onSubmit={handleSubmit}>
                <div className="ask-description">
                    <h4>توضیحات</h4>
 
                    <textarea
                        className='ask-description-textarea'
                        name="content"
                        onChange={handleChange}
                    />

                </div>
                <div className="ask-button">
                    <button className="ask-input-button" type="submit">ارسال پاسخ</button>
                </div>
            </form>
        </div>
      );
    }
}

export default UploadComment;
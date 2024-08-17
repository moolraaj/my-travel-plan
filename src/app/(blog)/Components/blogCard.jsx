import commentimg from '../../assets/home_images/comment.svg';
import calenderimg from '../../assets/home_images/calender.svg';
import Link from 'next/link';
import { format } from 'date-fns';

function BlogCard ({result})  {
    return (
       <>
       {result===null||result===undefined?('loading....'):(
        result.map((ele)=>{
            const formattedDate = format(new Date(ele.createdAt), 'dd MMM yyyy');
            return <div className="blogpagecard" key={ele._id}>
       
            {ele.images?.map((e) => (
              <img
              src={`/uploads/${e.name}`}
      
                key={e._id}
                alt='blog-image'
                className="image"
              />
            ))}
            <div className="blogcontent">
              <div className="category">{ele?.category?.slug||'uncategorised'}</div>
              <div className="meta">
                <span className="date">
                  <img src={calenderimg.src} alt="Calendar" />{formattedDate}
                </span>
                <span className="comments">
                  <img src={commentimg.src} alt="Comments" />{ele.comments||null}
                </span>
              </div>
              <h3 className="title">{ele.title}</h3>
              <Link href={`/blog/${ele.slug}`}>
                <button className="link">Read More → </button>
              </Link>
            </div>
          </div>
        })
       )}
       </>
    );
  };
  export default BlogCard
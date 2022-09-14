var express = require("express");
var router =
  express.Router();
var {
  validateUserData,
} = require("../validation/users");

/* GET home page.- Create two GET routes in ./routes/blogs.js
	- GET /blogs/all that will send the entire list of sample blogs in the HTTP response
		- _Remember_: Since route names concatenate with the blogs router code we added to app.js, 
        we only need to name our new route "/all" in blogs.js. This is because all of the routes we will create in blogs.js 
        will concatenate their route name
         with "/blogs" from the app.use('/blogs', blogsRouter); line of code in app.js. 
		- _Note_: It is good practice to send success: true in the response JSON
			- res.json({
					success: true,
					blogs: sampleBlogs
				});
	- GET /blogs/single/:blogTitleToGet that will send a single blog from the sample blogs in the HTTP response
     based upon the blog title passed into the url
- Create one DELETE route with a single route param blogTitleToDelete
	- DELETE /blogs/single/:blogTitleToDelete that will delete a single blog in the sample blogs based upon the 
    blog title passed into the url
	- _Note_: Even though we are not sending any blog data back with this request, we still need to respond to the
     request. So we will res.json an object containing success:true.
- Create Postman requests for all of these routes and test to see that they work */

// - Create a new file /validation/blogs.js. In /validation/blogs.js:
// 	- Create a basic validator function for blogData and add that function to the module.exports
// - In /routes/blogs.js:
// 	- Import (require) the blogData validator function into /routes/blogs.js
// 	- Create one POST route /blogs/create-one to create a new blog post
// 		- _Note_: Do not forget to generated createdAt and lastModified in the new blog post
// 	- Create one PUT route /blogs/update-one/:blogTitle to update a blog post
// 	- Both of the above routes should run validations on the incoming blog post body data BEFORE either creating a new blog post or updating a blog post. If the blog data is invalid, then a message should be sent in the http response indicating which validation failed and why
// - Build out the blogData validator function to check for the following conditions
// 	- Title, text and author are required fields and they should be strings
// 	- Title and author should be no longer than 40 characters in length (letters + whitespace)
// 	- _Stretch Goal_:
// 		- If category is defined and has a length greater than 0:
// 		- All the entries must be strings
// 		- There can be no more than 10 entries for category
// 		- All categories msut be in the following list of strings:
// 			- "Lorem"
// 			- "ipsum"
// 			- "dolor"
// 			- "sit"
// 			- "amet"
const sampleBlogs = [
  {
    title: "dicta",
    text: "Iusto et in et. Nulla accusantium fugit. Et qui dolorem inventore soluta et veritatis. Aut ut aut non laudantium eveniet suscipit odit. Sapiente sint nihil nihil sit et molestias. In nisi omnis quas et sed aut minus aperiam ea.\n \rLaudantium quo quisquam quae. Et et quas officia perspiciatis iusto sunt sunt eaque. Quidem sit voluptas deserunt sequi magni.\n \rEst est facere cumque ipsam omnis animi. Voluptatem magnam officiis architecto possimus. Quia similique aut eos qui. Quasi quae sed aliquam.",
    author:
      "Darren Abbott",
    category: [
      "Lorem",
      "sit",
      "amet",
    ],
    createdAt:
      "2022-03-22T10:36:37.176Z",
    lastModified:
      "2022-03-22T10:36:37.176Z",
  },
  {
    title: "ducimus",
    text: "Placeat ea et fuga. Qui itaque quibusdam nam. Maxime nobis quam. Et laudantium sunt incidunt reiciendis.\n \rEarum aut sed omnis autem aliquam architecto corporis sint. Nostrum cumque voluptatem aperiam alias similique. Tenetur et esse omnis praesentium ipsum alias. Impedit rerum qui quia quaerat architecto mollitia est autem. Qui blanditiis earum et qui dolorum reprehenderit. Debitis est temporibus.\n \rEt nam sed. Corporis ut rerum. Ut qui dolore est dolorem ex.",
    author:
      "Luke Rogahn PhD",
    category: [
      "Lorem",
      "ipsum",
    ],
    createdAt:
      "2022-03-22T15:16:56.285Z",
    lastModified:
      "2022-03-22T15:16:56.285Z",
  },
  {
    title: "quod",
    text: "Accusamus nisi eos. Tenetur earum tenetur nemo. Qui voluptas temporibus repellendus maxime. Ipsum optio voluptate enim nihil. Ea et dolorem. Omnis unde perspiciatis.\n \rUt odio eaque. Harum non placeat. Eveniet molestiae in cupiditate dolor doloremque rerum eligendi aut ab.\n \rMolestias eligendi et. Nemo velit natus autem numquam atque provident et nulla. In et dolores ad nihil. Delectus quis doloremque asperiores similique. Asperiores id nam vitae nobis labore autem. Dolor aperiam provident quia consectetur aut ut.",
    author:
      "Maryann Schneider",
    category: [
      "Lorem",
      "ipsum",
      "dolor",
      "sit",
      "amet",
    ],
    createdAt:
      "2022-03-21T20:09:32.298Z",
    lastModified:
      "2022-03-21T20:09:32.298Z",
  },
  {
    title: "ut",
    text: "Itaque necessitatibus repudiandae. Porro suscipit exercitationem qui atque. Perferendis suscipit debitis sint aut dignissimos nobis ut. Modi ea nihil est vel consequuntur voluptatem. In magnam delectus in eos reiciendis sit est enim eligendi. Sint dicta at.\n \rConsectetur aspernatur alias sed non explicabo blanditiis laborum fugit voluptate. Reiciendis iste aut sit natus qui et in ratione. Placeat qui in voluptatum autem nulla ratione. Commodi sit alias sint sapiente rem. Quia sapiente minus deleniti vitae.\n \rExercitationem numquam omnis maxime dolorum sed deserunt suscipit laudantium. Ad et autem voluptatem esse laudantium et. Id fuga accusamus est sapiente dicta.",
    author:
      "Dr. Lorenzo Anderson",
    category: [
      "ipsum",
      "dolor",
      "sit",
      "amet",
    ],
    createdAt:
      "2022-03-21T23:07:53.447Z",
    lastModified:
      "2022-03-21T23:07:53.447Z",
  },
  {
    title: "id",
    text: "Porro officia aliquid fugiat sed reprehenderit illo amet doloribus sed. Molestiae vero et. Quae voluptates dolores. Voluptatem facere fuga. Veniam perferendis illo ut sunt earum deleniti.\n \rIusto neque dolorem esse error. Saepe et quia ut corrupti. Autem repellendus similique dolorem sunt in ipsa perferendis. Et excepturi ut voluptatem deserunt accusantium dolores aperiam cum ut.\n \rDoloremque expedita sit et voluptatem unde libero. Numquam beatae sed repellat iusto doloribus fugit tenetur. Possimus et ut adipisci harum voluptatem provident consequatur. Corporis quo aut vel itaque blanditiis illum.",
    author:
      "Bobbie Dach",
    category: ["amet"],
    createdAt:
      "2022-03-22T15:14:39.819Z",
    lastModified:
      "2022-03-22T15:14:39.819Z",
  },
];

let showBlog = [];

router.put(
  "/update-one/:blogTitle",
  (req, res) => {
    let blogTitle =
      req.params
        .blogTitle;

    const updatedBlogIndex =
      sampleBlogs.findIndex(
        (blog) => {
          if (
            blog.title ===
            blogTitle
          ) {
            return true;
          } else {
            return false;
          }
        }
      );
    const updatedBlog =
      sampleBlogs[
        updatedBlogIndex
      ];
    const date =
      new Date();

    let text =
      req.body.text;
    let author =
      req.body.author;
    let category =
      req.body.category;

    const updatedBlogUpdate =
      {
        title:
          updatedBlog.title,
        text: text,
        author: author,
        category:
          category,
        createdAt:
          updatedBlog.createdAt,
        lastModified:
          date,
      };

    const checkData =
      validateUserData(
        updatedBlogUpdate
      );

    if (
      checkData.isValid ===
      false
    ) {
      res.json({
        success: false,
        message:
          checkData.message,
      });
      return;
    }
  
    sampleBlogs.push(checkData)

    res.json({
      success: true
    })
  
  
  
  }
);

router.get(
  "/single/:blogTitleToGet",
  (req, res) => {
    let localBlogs =
      sampleBlogs;
    let blogTitleToGet =
      req.params
        .blogTitleToGet;

    for (
      let i = 0;
      i <
      localBlogs.length;
      i++
    ) {
      if (
        blogTitleToGet ===
        localBlogs[i]
          .title
      ) {
        let displayBlog =
          [
            {
              title:
                localBlogs[
                  i
                ].title,
              text: localBlogs[
                i
              ].text,
              author:
                localBlogs[
                  i
                ].author,
              category:
                localBlogs[
                  i
                ]
                  .category,
              createdAt:
                localBlogs[
                  i
                ]
                  .createdAt,
              lastModified:
                localBlogs[
                  i
                ]
                  .lastModified,
            },
          ];
        showBlog =
          displayBlog;
        console.log(
          displayBlog
        );
        console.log(
          showBlog
        );
      }
    }
    console.log(
      blogTitleToGet
    );

    console.log(
      showBlog
    );
    res.json({
      success: true,
      blogs: showBlog,
    });
  }
);

router.get(
  "/all",
  (req, res) => {
    res.json({
      success: true,
      blogs: sampleBlogs,
    });
  }
);
router.post(
  "/create-one",
  (req, res) => {
    const title =
      req.body.title;
    const text =
      req.body.text;
    const author =
      req.body.author;
    const catergory =
      req.body.catergory;

    const userData = {
      title,
      text,
      author,
      catergory,
      createdAt:
        new Date(),
      lastModified:
        new Date(),
    };
    const userDataCheck =
      validateUserData(
        userData
      );

    if (
      userDataCheck.isValid ===
      false
    ) {
      res.json({
        success: false,
        message:
          userDataCheck.message,
      });
      return;
    }

    showBlog.push(
      userData
    );

    console.log(
      "userList ",
      showBlog
    );
    res.json({
      success: true,
    });
  }
);

router.get(
  "/",
  function (
    req,
    res,
    next
  ) {
    res.json({
      success: true,
      route: "blogs",
      message:
        "hello from the blogs default route",
    });
  }
);

router.delete(
  "/single/:blogTitleToDelete",
  (req, res) => {
    const blogIndexToDelete =
      sampleBlogs.findIndex(
        (blog) => {
          if (
            blog.title ===
            req.params
              .blogTitleToDelete
          ) {
            return true;
          } else {
            return false;
          }
        }
      );

    console.log(
      blogIndexToDelete
    );

    if (
      blogIndexToDelete <
      0
    ) {
      res.json({
        hasBeenDeleted: false,
      });
      return;
    }

    sampleBlogs.splice(
      blogIndexToDelete,
      1
    );

    res.json({
      hasBeenDeleted: true,
    });
  }
);

module.exports = router;

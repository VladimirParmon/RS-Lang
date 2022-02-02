
  const loginUser = async (user) => {
    const rawResponse = await fetch('https://rs-lang-redblooded.herokuapp.com/signin', {
      method: 'POST',
      headers: {

        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const content = await rawResponse.json();
  
    const userID = content.userId;
    const token = content.token;
    console.log(content)

    const deleteUser = async user => {
      console.log(userID, token);
      const rawResponse = await fetch(`https://rs-lang-redblooded.herokuapp.com/users/${userID}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
    };
    //deleteUser()
  };
  
  loginUser({ "email": "hello@user.com", "password": "Gfhjkm_123" });

  const createUser = async user => {
    const rawResponse = await fetch('https://rs-lang-redblooded.herokuapp.com/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const content = await rawResponse.json();
  
    console.log(content);
  };

//createUser({ "email": "hello@user.com", "password": "Gfhjkm_123" });



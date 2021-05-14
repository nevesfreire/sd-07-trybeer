import styled from 'styled-components';

const Container = styled.div`

.page-body {
  align-items: center;
  background-image: linear-gradient(#191919, #000);
  color: white;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-x: hidden;
  width: 100vw;
}

.title {
  background: -webkit-linear-gradient(white 40%, black);
  font-family: 'LuloCleanW01-OneBold', monospace;
  font-size: 45px;
  margin: 10vh auto 7vh;
  top: 0;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.form-container {
  background-color: #252525;
  border-radius: 30px;
  padding: 30px;
  width: 400px;
}

h2 {
  font-family: 'Apercu';
  font-size: 20px;
  font-weight: 500;
}

input {
  background-color: #252525;
  border: none;
  border-bottom: 2px solid #444;
  color: white;
  font-family: "Proxima Nova",-apple-system,"Helvetica Neue",Helvetica,Roboto,Arial,sans-serif;
  font-size: 20px;
  outline: none;
  transition: border-bottom 0.3s ease;
  width: 100%;
}

input:focus {
  border-bottom: 2px solid #777;
}

.btn-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px 0 0;
}

.form-btn {
  background-color: #666;
  border: none;
  border-radius: 8px;
  box-shadow: 0 0 8px 0 #888;
  color: white;
  cursor: pointer;
  font-family: 'Apercu';
  font-size: 16px;
  font-weight: bolder;
  margin-top: 1rem;
  padding: 15px;
  transition: 0.3s;
}

#btn-submit {
  margin-top: 40px;
  width: 100%;
}

#btn-new-user {
  background-color: #252525;
  box-shadow: none;
  flex-grow: 0;
  margin-top: 30px;
  text-decoration: underline;
}

.form-btn:hover {
  background-color: #888;
}

@media (orientation:portrait), (max-width: 500px) {
  .page-body {
    background-color: #252525;
    background-image: none;
    height: 100vh;
    width: 100vw;
  }

  .title {
    margin: 5vh 0 10vh;
  }

  .form-container {
    border-radius: 0;
    height: 100vh;
    margin: 0 10px;
    padding: 0  60px;
    width: 85vw;
  }

  input {
    border-bottom: 1px solid #444;
  }

  input:focus {
    border-bottom: 1px solid #777;
  }

  .form-btn {
    box-shadow: none;
  }
}

`;

export default Container;

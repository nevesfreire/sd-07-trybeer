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
  appearance: auto;
  background-color: #252525;
  border: none;
  border-bottom: 2px solid #444;
  color: white;
  font-family: 'Apercu';
  font-size: 20px;
  outline: none;
  transition: border-bottom 0.3s ease;
  width: 100%;
}

input:focus {
  border-bottom: 2px solid #777;
  transition: border-bottom 0.3s ease;
}

.form-checkbox {
  flex-direction: row;
  margin-top: 30px;
}

.btn-container {
  display: flex;
  justify-content: center;
  margin: 20px 0 0;
}

.form-btn {
  background-color: #666;
  border: none;
  border-radius: 8px;
  box-shadow: 0px 0px 8px 0 #888;
  color: white;
  cursor: pointer;
  font-family: 'Apercu';
  font-size: 16px;
  font-weight: bolder;
  margin-top: 1rem;
  padding: 15px;
  transition: 0.3s;
  width: 100%;
}

.form-btn:hover {
  background-color: #888;
}

.box {
  width: 300px;
  margin: 25px 0 0;
  display: flex;
  align-items: center;
  user-select: none;

  label {
    font-family: 'Apercu';
    font-size: 20px;
    color: white;
    position: absolute;
    z-index: 10;
    padding-left: 50px;
    cursor: pointer;
  }

  input {
    opacity: 0;
    visibility: hidden;
    position: fixed;

    &:checked {
      ~ .check {
        border-color: #444;
        box-shadow: 0px 0px 0px 15px #666 inset;
        &::after {
          opacity: 1;
          transform: scale(1);
        }
      }
    }
  }

  .check {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: 100px;
    background-color: #252525;
    border: 2px solid #444;
    box-shadow: 0px 0px 0px 0px #666 inset;
    transition: all 0.2s cubic-bezier(0, 1.05, 0.72, 1.07);

    &::after {
      content: '';
      width: 100%;
      height: 100%;
      opacity: 0;
      z-index: 4;
      position: absolute;
      transform: scale(0);
      background-size: 50%;
      background-image: url('http://s6.picofile.com/d/8392306668/c38c12a0-6db3-47d4-a80c-7dad8fab5186/checkmark.svg');
      background-repeat: no-repeat;
      background-position: center;
      transition-delay: 0.2s !important;
      transition: all 0.25s cubic-bezier(0, 1.05, 0.72, 1.07);
    }
  }
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

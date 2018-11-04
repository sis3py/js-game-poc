export const chatStyle = {
  chat: {
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    height: '100%',
  },
  messages: {
    height: 'calc(100% - 40px)',
    width: '100%',
    overflowY: 'scroll',
  },
  message: {
    height: 20,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
  },
  notification: {
    color: '#ffa500',
    fontStyle: 'italic',
  },
  date: {
    marginRight: 10,
  },
  author: {
    marginRight: 10,
  },
  content: {
    color: '#FFFFFF',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    height: 40,
    width: '100%',
  },
  textfield: {
    width: 'calc(100% - 160px)',
    marginRight: 10,
  },
  button: {
    width: 150,
  },
};

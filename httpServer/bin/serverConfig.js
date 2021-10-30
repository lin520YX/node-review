module.exports = {
  port:{
    option:"-p, --port <v>",
    descriptor:'set you server port',
    usage:'lyfServer --port 3000',
    default:8000
  },
  directory:{
    option:"-d, --directory <v>",
    descriptor:'set you server start directory',
    usage:'lyfServer --directory path',
    default:process.cwd()
  }
}
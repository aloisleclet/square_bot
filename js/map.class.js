class Map {

  constructor()
  {
    this.elements = [];
  }

  add(e)
  {
    this.elements.push(e); 
  }

  render()
  {
    this.elements.forEach(function(e)
    {
      let now = Math.floor(Date.now() / 1000);

      //read tasklist 
      if (now > e.task_list[e.current_task].timestamp) 
      {
        e.state = e.task_list[e.current_task].action;
        e.future_x = Math.ceil(Math.random() * 500);
        e.future_y = 100;
        e.update_direction();
        e.current_task++;
      }

      //execture
      if (e.state == 'walking')
        e.walk();
      else if (e.state == 'jumping')
        e.jump();
      else if (e.state == 'squatting')
        e.squat();
      else if (e.state == 'standing')
        e.stand();
      else if (e.state == 'sleeping')
        e.sleeping();
    });
  }
}

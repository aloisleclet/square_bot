class Bot
{
  
  constructor(id) {
    console.log('construct a bot');
    this.y = 0;
    this.x = 0;

    this.direction = 'right';
    this.direction_y = 'up';

    this.velocity_y = 3;

    this.future_x = 0;
    this.future_y = 0; 

    this.state = 'standing';

    this.id = id;

    this.task_list = [];
    this.current_task = 0;

    this.jump_step = 0;

    this.html = ` 
       <div class="character stand" id="`+this.id+`"> 
         <div class="body">                                     
           <div class="eyes">                                       
             <div class="eye"></div>                                  
             <div class="eye"></div>                                   
           </div>
         </div>
         <div class="foot">
           <div class="feet"></div>                           
           <div class="feet"></div>                                    
         </div>
       </div>
    `;

    document.getElementById('map').innerHTML += this.html;
    this.e = document.getElementById(this.id);

  }

  give_purpose(nb_actions)
  {
    let i = 0;
    let actions = ['walking', 'standing', 'squatting', 'jumping', 'sleeping'];

    let timestamp = Math.floor(Date.now() / 1000);

    while (i < nb_actions)
    {
      let delay = Math.ceil(Math.random() * 2);

      let task = {
        'timestamp': timestamp + i * delay,
        'action': actions[Math.ceil(Math.random() * actions.length - 1)]
      };
      this.task_list.push(task);
      i++;
    }
    console.log(this.task_list);
  }

  walk_to(future_x) 
  {
    if (future_x > this.x)
      this.direction = 'right';
    else if (future_x < this.x)
      this.direction = 'left';

    this.state = 'walking';
    this.e.classList.add('walk');
    this.future_x = future_x;
  }

  update_direction()
  {
    if (this.future_x > this.x)
      this.direction = 'right';
    else if (this.future_x < this.x)
      this.direction = 'left';
    else if (this.future_y < this.y)
      this.direction_y = 'down';
    else if (this.future_y > this.y)
      this.direction_y = 'up';
  }

  change_animation(class_name)
  {
    this.e.classList = ['character'];
    if (class_name != '')
      this.e.classList.add(class_name);
  }
 
  walk()
  {
      this.change_animation('walk');
 
      if (this.direction == 'right')
      {
        //change class
        if(this.e.classList.contains('left'))
          this.e.classList.remove('left');
        if(!this.e.classList.contains('right'))
          this.e.classList.add('right');


        this.x += this.x < this.future_x ? 0.75 : -0.75;
        this.e.style.left = this.x+'px';
      }
      else
      {
        //change class
        if(this.e.classList.contains('right'))
          this.e.classList.remove('right');
        if(!this.e.classList.contains('left'))
          this.e.classList.add('left');

        this.x += this.x < this.future_x ? 0.75 : -0.75;
        this.e.style.left = this.x+'px';
      }

      if (Math.ceil(this.x) == this.future_x)
        this.stand();
  }

  stand()
  {
    this.state = 'standing';
    if (!this.e.classList.contains('stand'))
      this.change_animation('stand');
  }


  squat()
  {
    if (!this.e.classList.contains('squat'))
      this.change_animation('squat'); 
  }

  jump()
  {
    this.jump_step++;
    this.change_animation();  

    if (this.jump_step < 50)
    {
      this.change_animation('squat_down');
    }
    else if (this.jump_step > 50 && this.jump_step < 172)
    {
      this.change_animation('');

      this.x += this.x < this.future_x ? 0.75 : -0.75;

      this.y += this.direction_y == 'up' ? this.velocity_y * 0.75 : this.velocity_y * -0.75;

      this.velocity_y += this.direction_y == 'up' ? -0.05 : 0.05;

      if (this.future_y < Math.ceil(this.y))// top of the jump
        this.direction_y = 'down'; 

      if (this.y <= 0)
      {
        this.y = 0;
      }

      this.e.style.left = this.x+'px';
      this.e.style.bottom = this.y+'px';
    }
    else if (this.jump_step > 172 && this.jump_step < 200)
    {
      this.change_animation('land');
    }
    else if (this.jump_step > 192)
    {
      this.change_animation('standing');
      this.jump_step = 0;
      this.state = 'standing';
      this.velocity_y = 3;
    }

  }

  sleeping()
  {
      this.change_animation('sleep');
  }

  choose_action()
  {
    let rand = Math.ceil(Math.random() * 1000);

    if (rand > 900) //walk
    {
      this.future_x = Math.ceil(Math.random() * 500);
      this.state = 'walking';
      this.update_direction();
    }
    else if (rand > 800)
    {
      this.state = 'jumping';
      this.future_y = 100;
      this.update_direction();
    }
    else if (rand > 700)
    {
      this.state = 'squatting';
    }
    else//stand
    {
      this.state = 'standing';
      this.stand();
    }
  }

 
}

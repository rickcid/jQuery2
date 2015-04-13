$(document).ready(function() {

  $('#newTaskForm').hide();  //This hides the form when the doc loads.

  var listo = []; //Array that holds Task objects

  var Task = function(task) { //Constructor builds the objects
    this.task = task;
    this.id = 'new';
  };

  var addTask = function(task) {  //Creates an object (calls the constructor) and pushes it to the array
    if (task) {                   //This line will validate that function only runs if 'task' is truthy          
      task = new Task(task);      //This calls our task construcotr and fills if with the new task
      listo.push(task);           //This  will push the new task to the array
      console.log(task);
      $('#newItemInput').val(''); //These lines clear the input form after it is submitted and it also shows the new list item in the index.html
      $('#newList').append('<a href="#" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');  

    }
    //Fade toggle that hides and shows the New Button input form at same time
    //$('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');

  };

  //JQuery event that calls the addTask function when saveNewItem button is clicked
  $('#saveNewItem').on('click', function(e) {
    e.preventDefault();
    var task = $('#newItemInput').val().trim();
    addTask(task);
  });

  //Opens form
  $('#newListItem').on('click', function() {
    $('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
  });
  //Closes form
  $('#cancel').on('click', function (e) {
    e.preventDefault();
    $('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
  });

  //Allows to change the status of an item from 'new' to 'inProgress'
  $(document).on('click', '#item', function(e) { 
    e.preventDefault(); //Removes the default properties of whatever HTML element is clicked
  });

  //Accesses the 'this' keyword to pass to another function and changes ID to the string 'inProgress'
  $(document).on('click', '#item', function(e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
    this.id = 'inProgress';
  });

  //Moves the list item , by pulling all html around item
  $(document).on('click', '#item', function(e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
    this.id = 'inProgress';
    $('#currentList').append(this.outerHTML);
  });

  //Moves items from 'inProgress' to 'archived'
  $(document).on('click', '#inProgress', function(e) {
    e.preventDefault();
    var task = this;
    task.id = "archived";
    var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
    advanceTask(task);
    $('#archivedList').append(changeIcon);
  });

  //Deletes items on list by passing into advanceTask function w/out a new id
  $(document).on('click', '#archived', function(e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
  });

  var advanceTask = function(task) {
    var modified = task.innerText.trim()
    for (var i = 0; i < listo.length; i++) {
        if (listo[i].task === modified) {
            if (listo[i].id === 'new') {
                listo[i].id = 'inProgress';
            } else if (listo[i].id === 'inProgress') {
                listo[i].id = 'archived';
            } else {
                listo.splice(i, 1);
            }
            break;
        }
    }
    task.remove();
  };


});
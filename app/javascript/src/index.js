import $ from 'jquery';

import {
  indexTasks,
  postTask,
  destroyTask,
  completeTask,
  activateTask,
} from "./requests.js";

function refreshTasks() {
  indexTasks(function (response) {
    var htmlString = response.tasks.map(function(task) {
      return "<div class='col-10 mb-3 p-2 border rounded task' data-id='" + task.id + "'> \
        " + task.content + "\ </div><div class='col-2'><input type='checkbox'class='btn-check mark-complete' id='btn-check' data-id='" + task.id + "'" + (task.completed ? "checked" : "") + "><label class='btn btn-secondary me-2 p-2 mark-complete' for='btn-check'>Done</label><button class=' p-2 delete btn btn-secondary' data-id='" + task.id + "'>delete</button></div>";
    });

    $("#tasks").html(htmlString);
  });
}

$(document).ready(function () {
  refreshTasks();

  $(document).on('click', '.delete', function () {
    destroyTask($(this).data('id'));
  });

  $(document).on('change', '.mark-complete', function () {
    if (this.checked) {
      completeTask($(this).data('id'));
    } else {
      activateTask($(this).data('id'));
    }
  });

  $(document).on('submit', '#create-task', function (e) {
    e.preventDefault();
    const content = $("#new-task-content").val();
    postTask(content, function () {
      refreshTasks();
      $("#new-task-content").val("");
    });
  });
});

<!-- ____________________________ instructions _______________________________________ -->
  <div class="container d-flex justify-content-center align-middle">
    <div class="panel" id="info">
      <div class="info-heading panel-heading d-flex justify-content-end">
        <div class="mr-auto text-center" style="width: 100%">
          <h1>How to Use giphy.SEARCH()</h1>
        </div>
        <div id="infoWindowCloseBtn">
            <a href="#"><i class="material-icons md-light">highlight_off</i></a>
        </div>
      </div> <!-- panel-heading -->     
      <div class="panel-body ">
        <ul style="padding: 20px;">
          <li>Search items from search box are put into clickable pills that can be reused for repeat searches later.</li>
          <li>The data is provided by the GIPHY API.</li>
          <li>When the user clicks on a button, the page grabs 10 static, non-animated gif images from the GIPHY API 
              and places them on the page.</li>
          <li>When the user clicks one of the still GIPHY images, the gif should animate. 
              If the user clicks the gif again, it should stop playing.</li>
          <li>A rating (PG, G, so on) is displayed under every gif.</li> 
          <li>Hovering over a button will reveal a delete button.  Clicking will delete the button, it's images and sets the
              focus to the previous button </li>
        </ul>
      </div> <!-- panel-body -->
    </div> <!-- panel -->
  </div><!-- container -->
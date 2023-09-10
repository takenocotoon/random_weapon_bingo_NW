                <div class="p-menuForm">
                    <div class="p-menuForm__title">
                        <?php 
                            foreach ($submenu['title'] as $language => $value) {
                                echo "<span lang=\"{$language}\">{$value}</span>";
                            }
                        ?>
                    </div>
                    <?php 
    foreach ($submenu['items'] as $id => $name) {
        echo "<input type=\"{$submenu['type']}\" name=\"{$submenu['id']}\" value=\"{$id}\" id=\"js-{$submenu['id']}__{$id}\"";
        if (in_array($id, $submenu['defaultValues'])) { echo " checked"; };
        echo " class=\"c-{$submenu['type']}__hidden\">";
        echo "<label for=\"js-{$submenu['id']}__{$id}\" id=\"js-{$submenu['id']}__{$id}-label\" class=\"c-{$submenu['type']}__label\">";
        foreach ($name as $language => $value) {
            echo "<span lang=\"{$language}\">{$value}</span>";
        }
        echo "</label>";
    }
?>
                    <br>
                </div>

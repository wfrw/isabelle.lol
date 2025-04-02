client.notify("executed successfully!")
client.notify("script made and updated by oqrnkk")


client.on_event("render", function()
    for i, v in pairs(game:get_service("Workspace"):find_first_child("Drops"):get_children()) do
        if v.address ~= 0 then
            local Item = v:find_first_child("Main") or v:find_first_child("Item") or v:find_first_child("Handle") or v:find_first_child("Attachments")
			if Item.address ~= 0 then
                local visible, position = client.world_to_screen( Item:get_position() );
                renderer.text( position , Color3.new(255, 0, 0), v.name )
            end
        end
    end
end);

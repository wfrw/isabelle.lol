client.notify("executed successfully!")
client.notify("script made and updated by oqrnkk")
local HeadDot = true

client.on_event("render", function()
    local military = game:get_service("Workspace"):find_first_child("Military")
    if not military then return end  

    for _, folder in pairs(military:get_children()) do
        for _, soldier in pairs(folder:get_children()) do
            if soldier.name == "Soldier" then
                local head = soldier:find_first_child("Head")
                if head and head.address ~= 0 then
                    local visible, screenPos = client.world_to_screen(head:get_position())
                    if visible then
                        local text_size = 16 
                        local text_width = 8 
                        local text_height = text_size  

                        local dot_pos = Vector2.new(
                            screenPos.x - (text_width / 2),
                            screenPos.y - (text_height / 2)
                        )

              
                        local soldier_head_pos = Vector2.new(
                            screenPos.x - (#"Soldier" * text_width / 2),
                            screenPos.y - (text_height * 1.5)
                        )
                        if HeadDot then
                            renderer.text(dot_pos, Color3.new(255, 0, 0), "o", text_size)
                        end
                        renderer.text(soldier_head_pos, Color3.new(255, 255, 255), "Soldier", text_size)
                    end
                end
            end
        end
    end
end);
